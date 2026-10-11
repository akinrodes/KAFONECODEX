<template>
  <div class="pb-24 min-h-screen" :style="customThemeStyles" :class="themeConfig?.backgroundColor ? '' : 'bg-gray-900'">
    <!-- Cover Banner -->
    <div class="h-64 md:h-96 w-full relative">
      <img :src="profile?.cover_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'" alt="Cover" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>

    <UContainer class="-mt-32 relative z-10">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        
        <!-- Left Sidebar (Avatar, Bio, CTA) -->
        <div class="w-full md:w-1/3 space-y-6">
          <div class="w-40 h-40 rounded-2xl overflow-hidden border-4 border-gray-900 bg-gray-800 shadow-xl">
            <img :src="profile?.avatar_url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop'" alt="Avatar" class="w-full h-full object-cover" />
          </div>
          
          <div>
            <h1 class="text-4xl font-extrabold">{{ profile?.displayName || 'Raul Catalan' }}</h1>
            <p class="text-gray-400 font-medium text-lg mt-1 tracking-wide uppercase">{{ profile?.discipline || 'Mode / Styling' }} • {{ profile?.city || 'Paris' }}</p>
          </div>
          
          <div class="bg-gray-800/50 backdrop-blur border border-gray-700 p-6 rounded-2xl">
            <h3 class="text-sm text-gray-400 font-semibold mb-3 tracking-widest uppercase">Biographie</h3>
            <p class="text-gray-200 leading-relaxed">
              {{ profile?.bio || "Styliste iconoclaste basé à Paris. Mes créations explorent la frontière entre streetwear brut et luxe d'avant-garde. Directeur artistique pour de multiples marques émergentes." }}
            </p>
          </div>
          
          <div class="-mx-2">
            <UButton v-if="profile?.affiliateLink" block :style="{ backgroundColor: themeConfig?.primaryColor || '#f43f5e', color: '#fff' }" variant="solid" size="xl" trailing-icon="i-heroicons-arrow-top-right-on-square-20-solid">
              Soutenir le Trajet
            </UButton>
            <UButton v-else block :style="{ backgroundColor: themeConfig?.primaryColor || '#f43f5e', color: '#fff' }" variant="solid" size="xl" trailing-icon="i-heroicons-arrow-top-right-on-square-20-solid">
              Découvrir la Collection
            </UButton>
            
            <UButton class="mt-3" block color="white" variant="ghost" size="xl" icon="i-heroicons-link">
              Instagram
            </UButton>
          </div>
        </div>

        <!-- Right Content (Portfolio, Videos, Expériences) -->
        <div class="w-full md:w-2/3 space-y-12 mt-8 md:mt-24">
          
          <!-- Portfolio Videos / Carousel -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">RØDE REELS</h2>
              <UBadge color="gray" variant="soft">Premium</UBadge>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="aspect-[9/16] bg-gray-800 rounded-2xl overflow-hidden relative group cursor-pointer border border-gray-700 hover:border-rose-500 transition-colors">
                 <img src="https://images.unsplash.com/photo-1607522370275-ba3f8d59160d?w=800&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                 <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <div class="font-bold">Défilé Automne 2026</div>
                 </div>
                 <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <UIcon name="i-heroicons-play-circle-solid" class="w-16 h-16 text-white drop-shadow-lg" />
                 </div>
              </div>
              <div class="aspect-[9/16] bg-gray-800 rounded-2xl overflow-hidden relative group cursor-pointer border border-gray-700 hover:border-gray-500 transition-colors">
                 <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                 <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <div class="font-bold">Processus Créatif</div>
                 </div>
              </div>
            </div>
          </section>

          <!-- Expériences (CV type) -->
          <section>
            <h2 class="text-2xl font-bold mb-6">Timeline</h2>
            <div class="space-y-6 border-l-2 border-gray-800 ml-3 pl-6">
              <div class="relative">
                <div class="absolute w-3 h-3 rounded-full -left-[1.95rem] top-1.5 ring-4 ring-gray-900" :style="{ backgroundColor: themeConfig?.primaryColor || '#f43f5e' }"></div>
                <div class="text-sm font-bold tracking-widest mb-1" :style="{ color: themeConfig?.primaryColor || '#f43f5e' }">2026</div>
                <h3 class="text-lg font-bold">Lancement Collection Capsule</h3>
                <p class="text-gray-400">En collaboration exclusif avec la RØDEXPARTY.</p>
              </div>
              <div class="relative">
                <div class="absolute w-3 h-3 bg-gray-600 rounded-full -left-[1.95rem] top-1.5 ring-4 ring-gray-900"></div>
                <div class="text-sm font-bold tracking-widest text-gray-500 mb-1">2024 - 2025</div>
                <h3 class="text-lg text-gray-300 font-medium">DA Adjoint - Maison Indépendante</h3>
              </div>
            </div>
          </section>
        </div>

      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const profile = ref({
  displayName: 'Raul Catalan',
  discipline: 'Styliste & Modéliste',
  city: 'Paris',
  bio: "Styliste iconoclaste basé à Paris. Mes créations explorent la frontière entre streetwear brut et luxe d'avant-garde. Directeur artistique pour de multiples marques émergentes.",
  affiliateLink: 'https://rode.io/ref/raul-c',
  cover_url: '',
  avatar_url: '',
  themeConfig: {
    primaryColor: '#8b5cf6', // Exemple (Violet) "Digital Interior Design"
    backgroundColor: '#0f172a',
    layoutStyle: 'default'
  }
})

const themeConfig = computed(() => profile.value?.themeConfig)

const customThemeStyles = computed(() => {
  if (!themeConfig.value) return {}
  return {
    ...(themeConfig.value.backgroundColor && { backgroundColor: themeConfig.value.backgroundColor }),
    ...(themeConfig.value.primaryColor && { '--color-primary': themeConfig.value.primaryColor }),
  }
})

useHead({
  title: profile.value.displayName
})
</script>
