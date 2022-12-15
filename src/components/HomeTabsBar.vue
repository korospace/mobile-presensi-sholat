<template>
  
  <!-- Container -->
  <section
    id="container_tabsbar"
    class="flex bg-neutral-200 pt-2 text-neutral-900">

        <router-link 
          to="/history" 
          :class="{
            'bg-white':routeName!='history',
            'bg-transparent opacity-100':routeName=='history',
            'rounded-tr-xl shadow-lg shadow-black/70':routeName=='presensi'
          }"
          class="relative z-30 w-1/3 flex flex-col justify-center items-center pt-4 pb-2.5 duration-500 rounded-tl-md">
            <div 
              class="opacity-60 flex flex-col justify-center" 
              :class="{'opacity-100 scale-95 duration-300':routeName=='history'}">
                <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faHistory"/>
                <div class="mt-1 text-sm">history</div>
            </div>
        </router-link>
        <router-link 
          to="/presensi" 
          :class="{
            'bg-white':routeName!='presensi',
            'bg-transparent opacity-100 z-10':routeName=='presensi',
            'rounded-tl-xl shadow-lg shadow-black/70':routeName=='history',
            'rounded-tr-xl shadow-lg shadow-black/70 ':routeName=='profile'
          }"
          class="relative z-20 w-1/3 flex flex-col justify-center items-center pt-4 pb-2.5 duration-500">
            <div 
              class="opacity-60 flex flex-col justify-center" 
              :class="{'opacity-100 scale-95 duration-300':routeName=='presensi'}">
                <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faHome"/>
                <div class="mt-1 text-sm">home</div>
            </div>
        </router-link>
        <router-link 
          to="/profile" 
          :class="{
            'bg-white':routeName!='profile',
            'bg-transparent opacity-100':routeName=='profile',
            'rounded-tl-xl shadow-lg shadow-black/70':routeName=='presensi'
          }"
          class="relative z-20 w-1/3 flex flex-col justify-center items-center pt-4 pb-2.5 duration-500 rounded-tr-md">
            <div 
              class="opacity-60 flex flex-col justify-center" 
              :class="{'opacity-100 scale-95 duration-300':routeName=='profile'}">
                <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faUser"/>
                <div class="mt-1 text-sm">profile</div>
            </div>
        </router-link>
  
  </section>

</template>

<script>
import { faHome, faUser, faHistory } from '@fortawesome/free-solid-svg-icons'
import { computed, defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeTabsBar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    
    const routeName = computed(() => {
      return useRoute().name
    })

    return {
      routeName,
      faHome,
      faHistory,
      faUser
    }
  }
});
</script>

<style scoped>
    .router-link-exact-active {
        /* @apply text-neutral-100 */
    }
</style>