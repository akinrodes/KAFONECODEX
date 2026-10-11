<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
    <section class="py-20 px-4 text-center border-b border-gray-800">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-4">
        L'Annuaire <span class="text-[#E50914]">RØDE</span>
      </h1>
      <p class="text-gray-400 text-lg max-w-xl mx-auto mb-8">
        Découvrez les créateurs de la diaspora africaine. Filtrez par discipline, localisation, tier.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <UButton color="error" variant="solid" size="lg">Mode</UButton>
        <UButton color="neutral" variant="outline" size="lg">Musique</UButton>
        <UButton color="neutral" variant="outline" size="lg">Photographie</UButton>
        <UButton color="neutral" variant="outline" size="lg">Design</UButton>
        <UButton color="neutral" variant="outline" size="lg">Film</UButton>
      </div>
    </section>

    <!-- Creators Grid -->
    <section class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <!-- Creator Card -->
        <div v-for="creator in creators" :key="creator.id"
          class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-[#E50914] transition-colors cursor-pointer group">
          <div class="aspect-[3/4] relative overflow-hidden">
            <img :src="creator.photo" :alt="creator.name"
              class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div class="absolute bottom-0 inset-x-0 p-4">
              <span v-if="creator.tier === 'elite'"
                class="text-[10px] uppercase tracking-widest font-bold text-[#E50914] mb-1 block">
                ✦ Premium Élite
              </span>
              <span v-else-if="creator.tier === 'verified'"
                class="text-[10px] uppercase tracking-widest font-bold text-yellow-400 mb-1 block">
                ✓ Vérifié
              </span>
              <div class="text-sm text-gray-400 mb-1">{{ creator.category }}</div>
              <div class="text-lg font-bold text-white">{{ creator.name }}</div>
              <div class="text-sm text-gray-400 mt-1">{{ creator.location }}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'L\'Annuaire Créateurs' })

// Données mockées en attendant l'API backend
const creators = ref([
  { id: 1, name: 'Raul Catalan', category: 'Mode / Styling', location: 'Paris, FR', tier: 'elite',
    photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop' },
  { id: 2, name: 'Sarah V.', category: 'Design 3D', location: 'Cotonou, BJ', tier: 'verified',
    photo: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop' },
  { id: 3, name: 'DJ Karim', category: 'Musique / Amapiano', location: 'Dakar, SN', tier: 'verified',
    photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop' },
  { id: 4, name: 'Léa Morin', category: 'Photographie', location: 'Abidjan, CI', tier: 'elite',
    photo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop' },
  { id: 5, name: 'Marcus Obi', category: 'Film / Réalisation', location: 'Lagos, NG', tier: 'elite',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop' },
  { id: 6, name: 'Aminata Diallo', category: 'Haute Couture', location: 'Bamako, ML', tier: 'verified',
    photo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop' },
  { id: 7, name: 'Kofi Asante', category: 'Art Visuel', location: 'Accra, GH', tier: null,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop' },
  { id: 8, name: 'Yasmine Bah', category: 'Tatouage & Body Art', location: 'Bruxelles, BE', tier: 'elite',
    photo: 'https://images.unsplash.com/photo-1487412947147-5cebf96a2f79?w=600&auto=format&fit=crop' },
])
</script>
