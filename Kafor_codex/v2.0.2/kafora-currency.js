// ── Kafora · Currency Utility ──────────────────────────────────────────────
// Taux de référence (base : XOF/FCFA)
// 1 EUR = 655.957 XOF (taux fixe CFA zone franc)
// 1 USD ≈ 600 XOF (taux indicatif, mis à jour manuellement)

const KAFORA_RATES = {
  XOF: 1,
  EUR: 1 / 655.957,
  USD: 1 / 600
};

const KAFORA_SYMBOLS = {
  XOF: 'FCFA',
  EUR: '€',
  USD: '$'
};

const KAFORA_LOCALES = {
  XOF: 'fr-FR',
  EUR: 'fr-FR',
  USD: 'en-US'
};

function kaforaCurrency() {
  return localStorage.getItem('kafora-currency') || 'XOF';
}

function kaforaSetCurrency(code) {
  localStorage.setItem('kafora-currency', code);
}

// Convertit un montant en XOF vers la devise cible et le formate
function kaforaFormat(amountXOF, currency) {
  const cur = currency || kaforaCurrency();
  const converted = amountXOF * KAFORA_RATES[cur];
  const sym = KAFORA_SYMBOLS[cur];

  if (cur === 'XOF') {
    return Math.round(converted).toLocaleString('fr-FR') + ' FCFA';
  }
  if (cur === 'EUR') {
    return converted < 1
      ? '< 1 €'
      : Math.round(converted).toLocaleString('fr-FR') + ' €';
  }
  if (cur === 'USD') {
    return converted < 1
      ? '< $1'
      : '$' + Math.round(converted).toLocaleString('en-US');
  }
  return amountXOF.toLocaleString() + ' ' + sym;
}

// Convertit un montant saisi dans la devise courante vers XOF (pour stockage)
function kaforaToXOF(amount, currency) {
  const cur = currency || kaforaCurrency();
  return Math.round(amount / KAFORA_RATES[cur]);
}

// Injecte le sélecteur de devise dans un élément cible
// Usage : kaforaCurrencyPicker('containerId', callback)
function kaforaCurrencyPicker(containerId, onChange) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const cur = kaforaCurrency();
  el.innerHTML = ['XOF', 'EUR', 'USD'].map(c =>
    `<button class="kcy-btn${c === cur ? ' active' : ''}" data-c="${c}" onclick="kaforaPickCurrency('${c}','${containerId}',${onChange ? onChange.name : 'null'})">${c === 'XOF' ? 'FCFA' : c}</button>`
  ).join('');
}

function kaforaPickCurrency(code, containerId, callbackName) {
  kaforaSetCurrency(code);
  document.querySelectorAll(`#${containerId} .kcy-btn`).forEach(b => {
    b.classList.toggle('active', b.dataset.c === code);
  });
  if (callbackName && window[callbackName]) window[callbackName]();
}
