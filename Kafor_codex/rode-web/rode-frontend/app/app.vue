<template>
  <UApp>
    <div class="min-h-screen bg-gray-900 text-white">
      <!-- Navbar -->
      <header class="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
          <div class="text-2xl font-bold tracking-widest text-[#E50914] cursor-pointer">
            RØDE
          </div>
          <nav class="hidden md:flex gap-6 text-sm font-medium">
            <NuxtLink to="/" class="hover:text-gray-300">Hub Publique</NuxtLink>
            <NuxtLink to="/creators" class="hover:text-gray-300">Créateurs</NuxtLink>
            <NuxtLink to="/events" class="hover:text-gray-300">Billetterie</NuxtLink>
          </nav>
          <div class="flex items-center gap-4">
            <UButton color="neutral" variant="ghost">Connexion</UButton>
            <UButton color="error" variant="solid">Rejoindre RØDE</UButton>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main>
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-800 py-12 mt-20">
        <div class="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} RØDE. Tous droits réservés.
        </div>
      </footer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - RØDE` : 'RØDE - L\'Annuaire Créatif'
  }
})
</script>
