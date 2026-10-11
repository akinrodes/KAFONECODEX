<template>
  <div>
    <!-- Hero Section (Netflix Style) -->
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
          <UButton size="xl" color="rose" variant="solid" class="px-8 font-bold">Explorer l'Annuaire</UButton>
          <UButton size="xl" color="white" variant="outline" class="px-8 font-bold">Voir les Événements</UButton>
        </div>
      </div>
    </section>

    <!-- Categories / Creators Preview -->
    <section class="container mx-auto px-4 py-20">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-bold">Créateurs en lumière</h2>
        <UButton variant="ghost" color="gray" trailing-icon="i-heroicons-arrow-right-20-solid">Tout voir</UButton>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Mockup Card 1 -->
        <UCard class="bg-gray-800 border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group pb-0" :ui="{ body: { padding: 'p-0 sm:p-0' } }">
          <div class="aspect-[3/4] relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
             <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <div class="text-sm text-gray-400 mb-1">Mode / Styling</div>
                <div class="text-lg font-bold">Raul Catalan</div>
                <div class="text-rose-500 text-xs mt-1 uppercase tracking-wider font-semibold">Premium Élite</div>
             </div>
          </div>
        </UCard>

        <!-- Mockup Card 2 -->
        <UCard class="bg-gray-800 border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group pb-0" :ui="{ body: { padding: 'p-0 sm:p-0' } }">
          <div class="aspect-[3/4] relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
             <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <div class="text-sm text-gray-400 mb-1">Design 3D</div>
                <div class="text-lg font-bold">Sarah V.</div>
             </div>
          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Le Hub Publique'
})
</script>
