<template>
    <!-- Container -->
    <ion-content class="w-full flex-1 overflow-hidden">
    <section
      id="container_history"
        class="w-full h-full flex flex-col overflow-hidden">

          <!-- form date range -->
          <FormDateRange @filterOnChange="filterOnChange()" />
        
          <!-- head -->
          <header
            class="relative z-20 w-full h-64 flex justify-center overflow-visible">

              <!-- // Refresher // -->
              <ion-refresher
                slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" 
                @ionRefresh="doRefresh">
                  <ion-refresher-content>
                    
                  </ion-refresher-content>
              </ion-refresher>
              
              <div class="w-full h-full bg-masjid1 bg-no-repeat bg-cover overflow-hidden">

                <!-- bg blur -->
                <div
                  class="w-full h-full flex flex-col justify-start items-center bg-neutral-900/75 backdrop-blur-sm">
                    <!-- date start & date end -->
                    <div
                      @click="showDateRange" 
                      class="w-max px-2 py-1 mt-4 bg-neutral-800 text-sm text-neutral-200 placeholder-neutral-400/50 text-left sm:text-center outline-none border border-neutral-400 rounded cursor-pointer">
                        <p>{{ dateStartVal }} -> {{ dateEndVal }}</p>
                    </div>

                    <!-- history detail -->
                    <div
                    v-if="historySholat!=null"
                    class="w-full flex mt-6">
                      <div
                        class="flex-1 px-4 text-center text-neutral-200/90">
                          <p class="text-sm">
                            berjamaah</p>
                          <p
                          class="mt-1 text-2xl">{{ historySholat.berjamaah }}</p>
                      </div>
                      <div
                        class="flex-1 px-4 text-center text-neutral-200/90 border-x border-neutral-500">
                          <p class="text-sm">
                            munfarid</p>
                          <p
                          class="mt-1 text-2xl">{{ historySholat.munfarid }}</p>
                      </div>
                      <div
                        class="flex-1 px-4 text-center text-neutral-200/90">
                          <p class="text-sm">
                            tidak sholat</p>
                          <p
                          class="mt-1 text-2xl">{{ historySholat.tidak_sholat }}</p>
                      </div>
                    </div>

                    <!-- history score -->
                    <div
                      v-if="historySholat!=null"
                      class="w-full flex-1 flex flex-col justify-center items-center mb-8 text-center text-neutral-200/90">
                        <!-- <p class="text-sm mb-2">nilai</p> -->
                        <p
                          class="text-3xl font-extrabold">{{ historySholat.nilai }}</p>
                    </div>

                    <!-- loading -->
                    <div 
                      v-if="historySholat == null"
                      class="flex-1 flex justify-center items-center mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#737373" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                    </div>
                </div>

              </div>

              <!-- status description -->
              <div
                class="absolute -bottom-8 w-full flex flex-col items-center p-4 text-sm text-neutral-900/80 bg-neutral-200 rounded-t-3xl">

                  <div class="w-full flex justify-around items-center">
                    <div class="flex items-center">
                      <div class="w-4 h-4 bg-green-300"></div>
                      <p class="ml-1.5">berjamaah</p>
                    </div>
                    <div class="flex items-center">
                      <div class="w-4 h-4 bg-yellow-300"></div>
                      <p class="ml-1.5">munfarid</p>
                    </div>
                    <div class="flex items-center">
                      <div class="w-4 h-4 bg-red-500"></div>
                      <p class="ml-1.5">tidak sholat</p>
                    </div>
                  </div>

                  <!-- <div class="mt-4 flex items-center">
                    <div class="w-4 h-4 bg-neutral-400"></div>
                    <p class="ml-1.5">pengecekan</p>
                  </div> -->

              </div>

          </header>

          <!-- body -->
          <div
            class="relative z-10 w-full overflow-hidden" style="flex-grow: 1;flex-basis:0;">

              <div
                :class="{'overflow-hidden':historySholat == null,'overflow-auto':historySholat != null}"
                class="w-full min-h-max max-h-full pt-12 pb-8 px-4">
                  <!-- skeleton -->
                  <template v-if="historySholat == null">
                    <div
                      v-for="x in 6" :key="x"
                      class="w-full h-32 mt-4 bg-neutral-500 animate-pulse rounded-md">
                    </div>
                  </template>

                  <!-- real -->
                  <template v-if="historySholat != null">
                    <div
                      v-for="x in historySholat.list_presensi" :key="x"
                      class="w-full mt-4 p-3 border-l-8 bg-white border-slate-700 rounded-md overflow-hidden">
                        <div
                          class="flex">
                            <div
                              v-for="sholat in x.detil_presensi" :key="sholat"
                              class="flex-1 text-center text-md capitalize text-slate-600/90 font-bold">
                                <p class="mb-2">{{ sholat.sholat }}</p>
                                <div
                                  :class="{
                                    'opacity-0': sholat.status==null,
                                    'text-green-300': sholat.status == 'berjamaah' && sholat.check_status=='sudah',
                                    'text-yellow-300': sholat.status == 'munfarid' && sholat.check_status=='sudah',
                                    'text-red-500': sholat.status == 'tidak sholat' && sholat.check_status=='sudah',
                                    'text-neutral-400':sholat.check_status=='sedang',
                                  }" 
                                  class="overflow-hidden bg-white">
                                    <svg viewBox="0 0 24 24" width="26" height="26" class="inline-block"><path fill="currentColor" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path></svg>
                                </div>
                            </div>

                        </div>

                        <div 
                          class="flex items-center w-full mt-10 pl-1 text-slate-600/90 capitalize">
                            <font-awesome-icon class="text-lg" :icon="faCalendar"/>
                            <p class="text-sm ml-2">
                              {{ createDate(x.created_at) }}
                            </p>
                        </div>
                    </div>
                  </template>

              </div>

          </div>

    </section>
    </ion-content>
</template>

<script>
import { IonRefresher, IonRefresherContent, IonContent } from '@ionic/vue'
import { computed, defineComponent, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendar }      from '@fortawesome/free-solid-svg-icons'
import FormDateRange       from '@/components/FormDateRange.vue'
import { useStore }        from 'vuex';

export default defineComponent({
  name: 'HistoryView',
  components: {
    FormDateRange,
    FontAwesomeIcon,
    IonRefresher, 
    IonRefresherContent,
    IonContent,
  },
  setup() {
    const store = useStore();

    // date range
    const showDateRange = () => {
      store.commit("formDateRangeUx/SET_SHOW_FORM",true)
    }

    let dateStartVal = computed(() => {
        return store.state.formDateRangeUx.dateStart;
    })

    let dateEndVal = computed(() => {
        return store.state.formDateRangeUx.dateEnd;
    })

    let historySholat = computed(() => {
      return store.state.historyapi.historySholat;
    });

    // filter 
    const filterOnChange = () => {
      store.dispatch("historyapi/GET_HISTORY",{
        datestart:dateStartVal.value,
        dateend:dateEndVal.value
      });
    }

    // created date
    const createDate = (createdAt) => {
      let date   = new Date(new Date(createdAt).getTime());
      let numDay = date.toLocaleString("id-ID",{day: "2-digit",timeZone: 'Asia/Jakarta'});
      let strDay = date.toLocaleString("id-ID", {weekday: 'long',timeZone: 'Asia/Jakarta'});
      let month  = date.toLocaleString("id-ID", {month: 'long',timeZone: 'Asia/Jakarta'});
      let year   = date.toLocaleString("id-ID", {year: 'numeric',timeZone: 'Asia/Jakarta'});

      return `${strDay}, ${numDay} ${month} ${year}`
    }

    const doRefresh = (event) => {
      event.target.complete();
      filterOnChange();
    }

    onMounted(() => {
      filterOnChange();
    })

    return {
      doRefresh,
      showDateRange,
      dateStartVal,
      dateEndVal,
      historySholat,
      filterOnChange,
      faCalendar,
      createDate,
    }
  }
});
</script>

<style scoped>
  .bg-masjid1{
    background-image: url(../assets/images/masjid1.jpeg);
  }
</style>