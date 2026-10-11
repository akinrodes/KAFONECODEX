// ══ kafora-db.js — Couche données Kafora ══════════════════════════════════
// Firebase (Firestore + Auth) via CDN — aucun npm requis
// Fallback automatique vers localStorage si offline ou non configuré
// Aucune donnée sensible : email + profil public uniquement, jamais de CB
// ═══════════════════════════════════════════════════════════════════════════

const KAFORA_DB_VERSION = '1.0.30';

// ── Config Firebase ──────────────────────────────────────────────────────────
// Remplacer par tes valeurs depuis https://console.firebase.google.com
// Projet → Paramètres → Général → Tes applications → Config SDK
const FIREBASE_CONFIG = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_PROJECT_ID.firebaseapp.com',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId:             'YOUR_APP_ID'
};

// ── État du client ───────────────────────────────────────────────────────────
let _auth      = null;
let _db        = null;
let _dbReady   = false;
let _currentUser = null;

// ── Init ─────────────────────────────────────────────────────────────────────
function kaforaDbInit() {
  if (typeof firebase === 'undefined') {
    console.warn('[kafora-db] Firebase SDK non chargé — mode localStorage activé');
    return;
  }
  if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
    console.warn('[kafora-db] Firebase non configuré — mode localStorage activé');
    return;
  }
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    _auth    = firebase.auth();
    _db      = firebase.firestore();
    _dbReady = true;

    // Écoute les changements d'état auth
    _auth.onAuthStateChanged(function(user) {
      _currentUser = user;
      if (user) {
        kaforaSyncFromDb(user.uid);
        // Met à jour kafora-user en localStorage
        const existing = JSON.parse(localStorage.getItem('kafora-user') || '{}');
        localStorage.setItem('kafora-user', JSON.stringify(
          Object.assign({}, existing, { uid: user.uid, email: user.email, loggedAt: Date.now() })
        ));
      }
    });

    console.info('[kafora-db] Firebase connecté ✓');
  } catch(e) {
    console.warn('[kafora-db] Erreur init Firebase — mode localStorage:', e);
    _dbReady = false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

async function kaforaSignUp(email, password, displayName) {
  if (_dbReady) {
    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: displayName });
      // Crée le document utilisateur dans Firestore
      await _db.collection('users').doc(cred.user.uid).set({
        email:       email,
        displayName: displayName,
        plan:        'free',
        verified:    false,
        boosted:     false,
        createdAt:   firebase.firestore.FieldValue.serverTimestamp()
      });
      // Crée un profil vide
      await _db.collection('users').doc(cred.user.uid)
        .collection('profile').doc('main').set({
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      return { ok: true, user: cred.user };
    } catch(e) {
      return { ok: false, error: _firebaseError(e.code) };
    }
  }
  // Fallback localStorage
  const existing = JSON.parse(localStorage.getItem('kafora-user') || '{}');
  if (existing.email) return { ok: false, error: 'Un compte existe déjà sur cet appareil.' };
  const user = { email, displayName, plan: 'free', verified: false, createdAt: Date.now() };
  localStorage.setItem('kafora-user', JSON.stringify(user));
  return { ok: true, user };
}

async function kaforaSignIn(email, password) {
  if (_dbReady) {
    try {
      const cred = await _auth.signInWithEmailAndPassword(email, password);
      // onAuthStateChanged s'occupe du sync
      return { ok: true, user: cred.user };
    } catch(e) {
      return { ok: false, error: _firebaseError(e.code) };
    }
  }
  return { ok: false, error: 'Mode offline — utilise un compte démo.' };
}

async function kaforaSignOut() {
  if (_dbReady) {
    await _auth.signOut();
  }
  _currentUser = null;
  localStorage.removeItem('kafora-user');
  localStorage.removeItem('kafora-profil');
  localStorage.removeItem('kafora-partners');
  localStorage.removeItem('kafora-links');
}

function kaforaGetCurrentUser() {
  if (_dbReady && _currentUser) return _currentUser;
  const u = localStorage.getItem('kafora-user');
  return u ? JSON.parse(u) : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFIL
// ─────────────────────────────────────────────────────────────────────────────

async function kaforaSaveProfile(profil) {
  // Local d'abord — immédiat, fonctionne offline
  const existing = JSON.parse(localStorage.getItem('kafora-profil') || '{}');
  const merged   = Object.assign({}, existing, profil);
  localStorage.setItem('kafora-profil', JSON.stringify(merged));

  if (!_dbReady || !_currentUser) return { ok: true, source: 'local' };

  try {
    await _db.collection('users').doc(_currentUser.uid)
      .collection('profile').doc('main').set({
        bio:          profil.bio          || null,
        city:         profil.city         || null,
        country:      profil.country      || null,
        disciplines:  profil.discs        || [],
        photoUrl:     profil.photo        || null,
        accentColor:  profil.accentColor  || '#B08D57',
        layout:       profil.layout       || 'editorial',
        sectionOrder: profil.sectionOrder || [],
        igHandle:     profil.ig           || null,
        website:      profil.web          || null,
        boutiqueName: profil.boutiqueName || null,
        boutiqueIntro:profil.boutiqueIntro|| null,
        updatedAt:    firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    return { ok: true, source: 'firebase' };
  } catch(e) {
    console.warn('[kafora-db] Save profile error:', e.message);
    return { ok: true, source: 'local', warning: e.message };
  }
}

async function kaforaLoadProfile(uid) {
  if (_dbReady && uid) {
    try {
      const doc = await _db.collection('users').doc(uid)
        .collection('profile').doc('main').get();
      if (doc.exists) {
        const d = doc.data();
        const profil = {
          bio:          d.bio,
          city:         d.city,
          country:      d.country,
          discs:        d.disciplines    || [],
          photo:        d.photoUrl,
          accentColor:  d.accentColor,
          layout:       d.layout,
          sectionOrder: d.sectionOrder,
          ig:           d.igHandle,
          web:          d.website,
          boutiqueName: d.boutiqueName,
          boutiqueIntro:d.boutiqueIntro
        };
        // Sync local
        const existing = JSON.parse(localStorage.getItem('kafora-profil') || '{}');
        localStorage.setItem('kafora-profil', JSON.stringify(Object.assign({}, existing, profil)));
        return { ok: true, source: 'firebase', data: profil };
      }
    } catch(e) {
      console.warn('[kafora-db] Load profile error:', e.message);
    }
  }
  const local = JSON.parse(localStorage.getItem('kafora-profil') || '{}');
  return { ok: true, source: 'local', data: local };
}

// ─────────────────────────────────────────────────────────────────────────────
// LIENS AFFILIÉS
// ─────────────────────────────────────────────────────────────────────────────

async function kaforaSaveLinks(links) {
  localStorage.setItem('kafora-links', JSON.stringify(links));

  if (!_dbReady || !_currentUser) return { ok: true, source: 'local' };

  try {
    // Firestore : un document par lien, dans la sous-collection links/
    const batch = _db.batch();
    const ref   = _db.collection('users').doc(_currentUser.uid).collection('links');

    links.forEach(function(l) {
      const slug = (l.url || '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const docRef = ref.doc(slug);
      batch.set(docRef, {
        name:        l.name        || '',
        slug:        l.url         || '',
        originalUrl: l.originalUrl || l.url || '',
        partnerId:   l.partnerId   || null,
        clicks:      l.clicks      || 0,
        updatedAt:   firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    });

    await batch.commit();
    return { ok: true, source: 'firebase' };
  } catch(e) {
    console.warn('[kafora-db] Save links error:', e.message);
    return { ok: true, source: 'local', warning: e.message };
  }
}

async function kaforaLoadLinks(uid) {
  if (_dbReady && uid) {
    try {
      const snap = await _db.collection('users').doc(uid)
        .collection('links').orderBy('updatedAt', 'desc').get();
      const links = snap.docs.map(function(d) {
        const r = d.data();
        return { name: r.name, url: r.slug, originalUrl: r.originalUrl, partnerId: r.partnerId, clicks: r.clicks };
      });
      localStorage.setItem('kafora-links', JSON.stringify(links));
      return { ok: true, source: 'firebase', data: links };
    } catch(e) {
      console.warn('[kafora-db] Load links error:', e.message);
    }
  }
  const local = JSON.parse(localStorage.getItem('kafora-links') || '[]');
  return { ok: true, source: 'local', data: local };
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAN / FLAGS (Boost, Vérifié, Press Kit, Accès Marque)
// ─────────────────────────────────────────────────────────────────────────────

async function kaforaSetPlan(flag, value) {
  // flag : 'kaforaBoost' | 'kaforaVerified' | 'hasPressKit' | 'kaforaBrand'
  localStorage.setItem(flag, value ? 'true' : '');

  if (!_dbReady || !_currentUser) return;

  const update = {};
  if (flag === 'kaforaBoost')    update.boosted  = value;
  if (flag === 'kaforaVerified') update.verified = value;
  if (flag === 'hasPressKit')    update.hasPressKit = value;
  if (flag === 'kaforaBrand')    update.isBrand  = value;
  if (flag === 'kaforaBoost' && value) {
    update.boostedUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  try {
    await _db.collection('users').doc(_currentUser.uid).update(update);
  } catch(e) {
    console.warn('[kafora-db] SetPlan error:', e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SYNC COMPLÈTE (après connexion)
// ─────────────────────────────────────────────────────────────────────────────

async function kaforaSyncFromDb(uid) {
  if (!_dbReady || !uid) return;
  await Promise.all([
    kaforaLoadProfile(uid),
    kaforaLoadLinks(uid)
  ]);
  // Sync flags plan depuis Firestore
  try {
    const userDoc = await _db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      const d = userDoc.data();
      if (d.boosted)     localStorage.setItem('kaforaBoost',    'true');
      if (d.verified)    localStorage.setItem('kaforaVerified', 'true');
      if (d.hasPressKit) localStorage.setItem('hasPressKit',    'true');
      if (d.isBrand)     localStorage.setItem('kaforaBrand',    'true');
      // Met à jour kafora-user
      const u = JSON.parse(localStorage.getItem('kafora-user') || '{}');
      u.plan        = d.plan        || 'free';
      u.displayName = d.displayName || u.displayName;
      localStorage.setItem('kafora-user', JSON.stringify(u));
    }
  } catch(e) {
    console.warn('[kafora-db] Sync flags error:', e.message);
  }
  console.info('[kafora-db] Sync depuis Firebase OK');
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

function kaforaIsDbReady() { return _dbReady; }

function kaforaDbStatus() {
  return {
    ready:   _dbReady,
    version: KAFORA_DB_VERSION,
    source:  _dbReady ? 'firebase' : 'localStorage',
    user:    _currentUser ? _currentUser.email : null
  };
}

// Messages d'erreur Firebase traduits
function _firebaseError(code) {
  const ERRORS = {
    'auth/email-already-in-use':   'Cette adresse email est déjà utilisée.',
    'auth/invalid-email':          'Adresse email invalide.',
    'auth/weak-password':          'Mot de passe trop faible (6 caractères minimum).',
    'auth/user-not-found':         'Aucun compte trouvé avec cet email.',
    'auth/wrong-password':         'Mot de passe incorrect.',
    'auth/too-many-requests':      'Trop de tentatives. Réessaie dans quelques minutes.',
    'auth/network-request-failed': 'Problème de connexion réseau.'
  };
  return ERRORS[code] || 'Une erreur est survenue. Réessaie.';
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO MOCK DATA SEEDER
// ─────────────────────────────────────────────────────────────────────────────
function kaforaEnsureMockData() {
  const p = JSON.parse(localStorage.getItem('kafora-profil') || '{}');
  // Seulement si le profil est vide
  if (!p.experiences || p.experiences.length === 0) {
    p.experiences = [
      { year: '2024', brand: 'Vogue France', role: 'Directrice de Création', description: 'Direction artistique du shooting exclusif Fashion Week de Paris. Supervision des équipes de stylisme et gestion des sets complexes.', linkedProfile: 'vogue', media: ['file:///E:/AfroPunk/e74efe60a95879573e07255b59fcd1e9.jpg', 'file:///E:/AfroPunk/e7ca30197ff55a5d8b8d182df3d3f997.jpg', 'file:///E:/AfroPunk/e8efb2d315c0cf421331db3594ee6212.jpg'] },
      { year: '2022 - 2023', brand: 'Jacquemus', role: 'Styliste Senior', description: 'Stylisme pour la collection "Soleil de l\'Afrique".\nMise en valeur des tissus traditionnels africains dans une approche moderne et asymétrique. Collaboration sur la scénographie du défilé. Instagram pré-chargé en exemple.', media: ['file:///E:/AfroPunk/ebbdb4b91f4aa794044a5d0640dd0bce.jpg', 'https://www.instagram.com/p/DWg-PBul2UF/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==', 'https://www.instagram.com/reel/DRCP1lDjOtg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='] }
    ];
    if (!p.fn) p.fn = 'Amara';
    if (!p.ln) p.ln = 'Diallo';
    if (!p.layout) p.layout = 'editorial';
    if (!p.discs || p.discs.length === 0) p.discs = ['Mode'];
    if (!p.photo) p.photo = 'file:///E:/AfroPunk/00eb0d7f9cf46110b1323fb532d7b578.jpg';
    if (!p.ig) p.ig = '@amaracreates';
    if (!p.bio) p.bio = 'Directrice artistique basée à Paris.';
    localStorage.setItem('kafora-profil', JSON.stringify(p));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MONÉTISATION FREEMIUM (NATIVE ADS)
// ─────────────────────────────────────────────────────────────────────────────
const KAFORA_ADS = [
  {
    id: 'ad_louvre_1',
    brand: 'Le Louvre x RØDE',
    role: 'Exposition Temporaire',
    description: 'Découvrez la nouvelle exposition contemporaine "Lumières d\'Afrique". Profitez d\'un accès coupe-file et de -15% via votre passeport culturel.',
    media: ['https://images.unsplash.com/photo-1518998053401-878c735c080e?q=80&w=1400&auto=format&fit=crop'],
    linkedProfile: 'le_louvre',
    badge: 'Curated by Kafora',
    isAd: true
  },
  {
    id: 'ad_perfume_1',
    brand: 'Maison Margiela',
    role: 'Pop-Up Store Paris',
    description: 'Découvrez la nouvelle collection "Replica" dans notre nouvelle boutique immersive. Réservation prioritaire pour les membres de la communauté.',
    media: ['https://images.unsplash.com/photo-1594913785160-59fa30ed9b4e?q=80&w=1400&auto=format&fit=crop'],
    linkedProfile: 'margiela_paris',
    badge: 'Curated by Kafora',
    isAd: true
  }
];

function kaforaGetNativeAds() {
  const u = kaforaGetCurrentUser() || { plan: 'free' };
  // Les pubs ne s'affichent QUE sur le plan gratuit
  if (u.plan && u.plan !== 'free') return [];
  // Sélectionne une pub au hasard parmi la collection
  const ads = KAFORA_ADS.sort(() => 0.5 - Math.random()).slice(0, 1);
  return ads;
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  kaforaEnsureMockData();
  kaforaDbInit();
});
