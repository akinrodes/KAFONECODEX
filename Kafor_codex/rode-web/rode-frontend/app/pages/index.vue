<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>
      <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop" alt="Hero Background" class="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />
      
      <div class="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          La Culture. <span class="text-[#E50914]">Centralisée.</span>
        </h1>
        <p class="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Découvrez les meilleurs créateurs, achetez des places pour les événements les plus exclusifs et rejoignez l'élite.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="xl" color="error" variant="solid" class="px-8 font-bold">Explorer l'Annuaire</UButton>
          <UButton size="xl" color="neutral" variant="outline" class="px-8 font-bold">Voir les Événements</UButton>
        </div>
      </div>
    </section>

    <!-- Creators Preview -->
    <section class="container mx-auto px-4 py-20">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-bold">Créateurs en lumière</h2>
        <UButton variant="ghost" color="neutral" trailing-icon="i-heroicons-arrow-right-20-solid">Tout voir</UButton>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card 1 -->
        <div class="bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group rounded-xl overflow-hidden">
          <div class="aspect-[3/4] relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="Creator" />
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div class="text-sm text-gray-400 mb-1">Mode / Styling</div>
              <div class="text-lg font-bold text-white">Raul Catalan</div>
              <div class="text-rose-500 text-xs mt-1 uppercase tracking-wider font-semibold">Premium Élite</div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group rounded-xl overflow-hidden">
          <div class="aspect-[3/4] relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="Creator" />
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div class="text-sm text-gray-400 mb-1">Design 3D</div>
              <div class="text-lg font-bold text-white">Sarah V.</div>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group rounded-xl overflow-hidden">
          <div class="aspect-[3/4] relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="Creator" />
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div class="text-sm text-gray-400 mb-1">Musique</div>
              <div class="text-lg font-bold text-white">DJ Karim</div>
              <div class="text-rose-500 text-xs mt-1 uppercase tracking-wider font-semibold">Vérifié</div>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group rounded-xl overflow-hidden">
          <div class="aspect-[3/4] relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="Creator" />
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div class="text-sm text-gray-400 mb-1">Photographie</div>
              <div class="text-lg font-bold text-white">Léa Morin</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="border-t border-gray-800 py-24 text-center">
      <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Prêt à rejoindre l'élite ?</h2>
      <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
        Créez votre profil créateur, vendez vos billets et développez votre communauté avec RØDE.
      </p>
      <UButton size="xl" color="error" variant="solid" class="px-10 font-bold">Commencer gratuitement</UButton>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Le Hub Publique'
})
</script>
