<template>
    <!-- Container -->
    <section
      id="bg_dashboard"
      class="min-h-screen max-h-screen w-full bg-neutral-200">
        
        <!-- Container Max-Width -->
        <div class="min-h-screen max-h-screen w-full max-w-lg flex flex-col px-6 m-auto overflow-hidden">

            <div 
              class="relative flex justify-center items-center w-full pt-6 text-neutral-700/90">
                <router-link v-if="userdata!=null" to="/profile" class="absolute left-0 top-7">
                  <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faAngleLeft"/>
                </router-link>
                <div class="text-center text-xl xs:text-2xl">Setting Kota</div>
            </div>
        
            <div
              class="relative w-full mt-16">
                <input 
                  v-model="currentCity.lokasi"
                  type="text" autocomplete="off" name="currentcity" placeholder="Nama Kota"
                  class="w-full relative z-10 px-4 py-4 text-xl xs:text-2xl text-neutral-700 bg-neutral-300 focus:outline-none placeholder-transparent border border-neutral-500 rounded" disabled>
                <span
                  class="absolute -z-0 -top-6 left-0.5 text-neutral-600 transform text-xs">
                    Nama Kota</span>
            </div>

            <input 
              @keyup="doSearch"
              type="text" autocomplete="off" placeholder="cari nama kota"
              class="w-full relative z-10 mt-12 py-1 text-lg xs:text-xl text-neutral-700 bg-transparent focus:outline-none border-b-2 border-neutral-500">

            <div class="w-full mt-6 bg-white/60 rounded-md overflow-hidden" style="flex-grow: 1;flex-basis:0;">
                <div class="w-full min-h-max max-h-full overflow-auto">

                  <div
                   v-for="x in city" :key="x"
                   @click="changeCurrentCity($event,x)"
                   class="px-3 py-4 bg-white active:bg-neutral-100 text-neutral-900/90 border-b border-neutral-900/60 duration-300">
                      {{ x.lokasi }}
                  </div>

                </div>
            </div>

            <button
              @click="saveCurrentCity()"
              class="w-full mt-5 mb-5 py-3 font-bold text-center text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded">
                simpan
            </button>

        </div>

    </section>
</template>

<script>
import { getLocalStorage, saveLocalStorage } from '@/services/localstorage.service';
import { computed, defineComponent, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleLeft }     from '@fortawesome/free-solid-svg-icons'
import { useStore }  from 'vuex'
import { useRouter } from 'vue-router';
import { toast }     from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
  name: 'RegionSettingView',
  components: {
    FontAwesomeIcon
  },
  setup() {
    // instance
    const store  = useStore();
    const router = useRouter();

    let userdata = computed(() => {
      return (getLocalStorage("userdata")) ? getLocalStorage("userdata") : null;
    });

    const city = computed(() => {
      return store.state.regionsettingapi.city;
    });

    let currentCity = computed(() => {
      if (store.state.regionsettingapi.currentCity != null) {
        return store.state.regionsettingapi.currentCity
      }

      return (getLocalStorage("userregion")) ? getLocalStorage("userregion") : {} ;
    });

    const doSearch = (event) => {
      let tmpCity  = store.state.regionsettingapi.tmpCity;
      let key  = event.target.value;
      let data = tmpCity.filter(e => {
        if (e.lokasi.toLowerCase().includes(key.toLowerCase())) {
          return e;
        }
      })

      store.commit("regionsettingapi/SET_CITY",data);
    }

    const changeCurrentCity = ($event,data) => {
      store.commit("regionsettingapi/SET_CURRENT_CITY",data);
    }

    const saveCurrentCity = () => {
      if (store.state.regionsettingapi.currentCity == null) {
        return 0;
      }

      saveLocalStorage("userregion",currentCity.value);
      store.commit("regionsettingapi/SET_CURRENT_CITY",null);

      toast.success("lokasi berhasil disimpan !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        if (userdata.value==null) {
          router.push("/");
        } else {
          router.push("/profile");
        }
      }, 1000);
    }

    onMounted(() => {
      store.dispatch("regionsettingapi/GET_CITY")
    })

    return {
      faAngleLeft,
      userdata,
      currentCity,
      city,
      doSearch,
      changeCurrentCity,
      saveCurrentCity,
    }
  }
});
</script>

<style scoped>
  .bg-masjid1{
    background-image: url(../assets/images/masjid1.jpeg);
  }
</style>