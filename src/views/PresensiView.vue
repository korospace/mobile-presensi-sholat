<template>
    <!-- Container -->
    <ion-content class="w-full flex-1 overflow-hidden">
      <section
        id="container_presensi"
        class="w-full h-full flex flex-col bg-neutral-200 overflow-hidden">
          
          <FormStatusSholat />

          <FormConfirmSholat />

          <!-- // Refresher // -->
          <ion-refresher
            slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" 
            @ionRefresh="doRefresh">
              <ion-refresher-content>
                
              </ion-refresher-content>
          </ion-refresher>

          <!-- head -->
          <header
            class="relative z-20 w-full h-64 flex justify-center overflow-visible">
              
              <div class="w-full h-full bg-masjid1 bg-no-repeat bg-cover overflow-hidden">

                <!-- bg blur -->
                <div
                  class="relative w-full h-full flex flex-col justify-start items-center text-neutral-200/90 bg-neutral-900/75 backdrop-blur-sm">
                    <!-- region setting -->
                    <router-link v-if="userdata==null" to="/regionsetting" class="absolute right-6 top-3 opacity-75 active:opacity-100 duration-300">
                      <font-awesome-icon class="text-xl xs:text-2xl" :icon="faMapMarkedAlt"/>
                    </router-link>

                    <!-- next pray time -->
                    <p class="text-sm mt-12 mb-4">
                      waktu sholat berikutnya
                    </p>
                    <p class="text-5xl font-extrabold">
                      {{ nextPrayTime }}
                    </p>

                    <!-- current date -->
                    <div class="absolute bottom-8 left-6 text-left">
                      <p class="text-xs capitalize">
                        {{ region.lokasi.toLowerCase() }}
                      </p>
                      <p class="text-sm font-bold mt-1">
                        {{ hijriah }}
                      </p>
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

          <main class="relative z-10 w-full overflow-hidden" style="flex-grow: 1;flex-basis:0;">

            <div
              class="w-full min-h-max max-h-full pt-12 pb-8 px-4 overflow-auto">

                <div
                  :class="{
                    'opacity-50': timeIsOpen(jadwalSholat.date,jadwalSholat.subuh)==false,
                    'bg-white':presSubuh.status == null,
                    'bg-green-300':presSubuh.status == 'berjamaah',
                    'bg-yellow-300':presSubuh.status == 'munfarid',
                    'bg-red-500':presSubuh.status == 'tidak sholat',
                  }"
                  class="relative w-full flex justify-between items-center mb-4 py-4 px-5 rounded-full overflow-hidden shadow-md shadow-black/10">
                    <div
                      v-if="timeIsOpen(jadwalSholat.date,jadwalSholat.subuh)==false" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0">
                    </div>
                    <div
                      v-if="objectIsEmpty(presSubuh)==true" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-neutral-400/80 text-neutral-900/80 italic">
                        absen belum tersedia
                    </div>
                    <div
                      v-if="presSubuh.check_status =='sedang'" 
                      @click="konfirmasiSholat($event,presSubuh.uniqid,presSubuh.sholat,presSubuh.status)"
                      :class="{
                        'bg-green-300/90':presSubuh.status == 'berjamaah',
                        'bg-yellow-300/90':presSubuh.status == 'munfarid',
                        'bg-red-500/90':presSubuh.status == 'tidak sholat',
                      }"
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center text-neutral-900/60 italic">
                        <p :class="{'border-b border-neutral-900/80':privilege=='parent'}">
                          {{ privilege == 'student' ? 'dalam pemeriksaan' : 'butuh konfirmasi' }}
                        </p>
                    </div>
                    <div 
                      class="w-auto flex items-center">
                        <img src="../assets/images/sunrise.png" class="w-8 opacity-80">
                        <p class="text-sm ml-4 text-neutral-900/90">Subuh</p>
                    </div>
                    <div 
                      class="w-auto flex items-center text-neutral-900/90">
                        <p class="text-sm mr-4">
                          {{ jadwalSholat.subuh }}
                        </p>
                        <img 
                          v-if="presSubuh.status != null" 
                          src="../assets/images/checkbox.svg" class="w-5 opacity-80">
                        <img 
                          v-if="presSubuh.status == null"
                          :class="{'opacity-0':privilege=='parent','opacity-80':privilege=='student'||privilege==null}" 
                          @click="updateSholat($event,presSubuh.uniqid,presSubuh.sholat)"
                          src="../assets/images/checkboxempty.svg" class="w-5">
                    </div>
                </div>

                <div
                  :class="{
                    'opacity-50': timeIsOpen(jadwalSholat.date,jadwalSholat.dzuhur)==false,
                    'bg-white':presDzuhur.status == null,
                    'bg-green-300':presDzuhur.status == 'berjamaah',
                    'bg-yellow-300':presDzuhur.status == 'munfarid',
                    'bg-red-500':presDzuhur.status == 'tidak sholat',
                  }"
                  class="relative w-full flex justify-between items-center mb-4 py-4 px-5 rounded-full overflow-hidden shadow-md shadow-black/10">
                    <div
                      v-if="timeIsOpen(jadwalSholat.date,jadwalSholat.dzuhur)==false" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0">
                    </div>
                    <div
                      v-if="objectIsEmpty(presDzuhur)==true" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-neutral-400/80 text-neutral-900/80 italic">
                        absen belum tersedia
                    </div>
                    <div
                      v-if="presDzuhur.check_status =='sedang'" 
                      @click="konfirmasiSholat($event,presDzuhur.uniqid,presDzuhur.sholat,presDzuhur.status)"
                      :class="{
                        'bg-green-300/90':presDzuhur.status == 'berjamaah',
                        'bg-yellow-300/90':presDzuhur.status == 'munfarid',
                        'bg-red-500/90':presDzuhur.status == 'tidak sholat',
                      }"
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center text-neutral-900/60 italic">
                        <p :class="{'border-b border-neutral-900/80':privilege=='parent'}">
                          {{ privilege == 'student' ? 'dalam pemeriksaan' : 'butuh konfirmasi' }}
                        </p>
                    </div>
                    <div 
                      class="w-auto flex items-center">
                        <img src="../assets/images/sun.png" class="w-8 opacity-80">
                        <p class="text-sm ml-4 text-neutral-900/90">Dzuhur</p>
                    </div>
                    <div 
                      class="w-auto flex items-center text-neutral-900/90">
                        <p class="text-sm mr-4">
                          {{ jadwalSholat.dzuhur }}
                        </p>
                        <img 
                          v-if="presDzuhur.status != null" 
                          src="../assets/images/checkbox.svg" class="w-5 opacity-80">
                        <img 
                          v-if="presDzuhur.status == null"
                          :class="{'opacity-0':privilege=='parent','opacity-80':privilege=='student'||privilege==null}" 
                          @click="updateSholat($event,presDzuhur.uniqid,presDzuhur.sholat)"
                          src="../assets/images/checkboxempty.svg" class="w-5">
                    </div>
                </div>

                <div
                  :class="{
                    'opacity-50': timeIsOpen(jadwalSholat.date,jadwalSholat.ashar)==false,
                    'bg-white':presAshar.status == null,
                    'bg-green-300':presAshar.status == 'berjamaah',
                    'bg-yellow-300':presAshar.status == 'munfarid',
                    'bg-red-500':presAshar.status == 'tidak sholat',
                  }"
                  class="relative w-full flex justify-between items-center mb-4 py-4 px-5 rounded-full overflow-hidden shadow-md shadow-black/10">
                    <div
                      v-if="timeIsOpen(jadwalSholat.date,jadwalSholat.ashar)==false" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0">
                    </div>
                    <div
                      v-if="objectIsEmpty(presAshar)==true" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-neutral-400/80 text-neutral-900/80 italic">
                        absen belum tersedia
                    </div>
                    <div
                      v-if="presAshar.check_status =='sedang'" 
                      @click="konfirmasiSholat($event,presAshar.uniqid,presAshar.sholat,presAshar.status)"
                      :class="{
                        'bg-green-300/90':presAshar.status == 'berjamaah',
                        'bg-yellow-300/90':presAshar.status == 'munfarid',
                        'bg-red-500/90':presAshar.status == 'tidak sholat',
                      }"
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center text-neutral-900/60 italic">
                        <p :class="{'border-b border-neutral-900/80':privilege=='parent'}">
                          {{ privilege == 'student' ? 'dalam pemeriksaan' : 'butuh konfirmasi' }}
                        </p>
                    </div>
                    <div 
                      class="w-auto flex items-center">
                        <img src="../assets/images/cloudy.png" class="w-8 opacity-80">
                        <p class="text-sm ml-4 text-neutral-900/90">Ashar</p>
                    </div>
                    <div 
                      class="w-auto flex items-center text-neutral-900/90">
                        <p class="text-sm mr-4">
                          {{ jadwalSholat.ashar }}
                        </p>
                        <img 
                          v-if="presAshar.status != null" 
                          src="../assets/images/checkbox.svg" class="w-5 opacity-80">
                        <img 
                          v-if="presAshar.status == null"
                          :class="{'opacity-0':privilege=='parent','opacity-80':privilege=='student'||privilege==null}" 
                          @click="updateSholat($event,presAshar.uniqid,presAshar.sholat)"
                          src="../assets/images/checkboxempty.svg" class="w-5">
                    </div>
                </div>

                <div
                  :class="{
                    'opacity-50': timeIsOpen(jadwalSholat.date,jadwalSholat.magrib)==false,
                    'bg-white':presMagrib.status == null,
                    'bg-green-300':presMagrib.status == 'berjamaah',
                    'bg-yellow-300':presMagrib.status == 'munfarid',
                    'bg-red-500':presMagrib.status == 'tidak sholat',
                  }"
                  class="relative w-full flex justify-between items-center mb-4 py-4 px-5 rounded-full overflow-hidden shadow-md shadow-black/10">
                    <div
                      v-if="timeIsOpen(jadwalSholat.date,jadwalSholat.magrib)==false" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0">
                    </div>
                    <div
                      v-if="objectIsEmpty(presMagrib)==true" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-neutral-400/80 text-neutral-900/80 italic">
                        absen belum tersedia
                    </div>
                    <div
                      v-if="presMagrib.check_status =='sedang'" 
                      @click="konfirmasiSholat($event,presMagrib.uniqid,presMagrib.sholat,presMagrib.status)"
                      :class="{
                        'bg-green-300/90':presMagrib.status == 'berjamaah',
                        'bg-yellow-300/90':presMagrib.status == 'munfarid',
                        'bg-red-500/90':presMagrib.status == 'tidak sholat',
                      }"
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center text-neutral-900/60 italic">
                        <p :class="{'border-b border-neutral-900/80':privilege=='parent'}">
                          {{ privilege == 'student' ? 'dalam pemeriksaan' : 'butuh konfirmasi' }}
                        </p>
                    </div>
                    <div 
                      class="w-auto flex items-center">
                        <img src="../assets/images/cloudy-night.png" class="w-8 opacity-80">
                        <p class="text-sm ml-4 text-neutral-900/90">Magrib</p>
                    </div>
                    <div 
                      class="w-auto flex items-center text-neutral-900/90">
                        <p class="text-sm mr-4">
                          {{ jadwalSholat.magrib }}
                        </p>
                        <img 
                          v-if="presMagrib.status != null" 
                          src="../assets/images/checkbox.svg" class="w-5 opacity-80">
                        <img 
                          v-if="presMagrib.status == null"
                          :class="{'opacity-0':privilege=='parent','opacity-80':privilege=='student'||privilege==null}" 
                          @click="updateSholat($event,presMagrib.uniqid,presMagrib.sholat)"
                          src="../assets/images/checkboxempty.svg" class="w-5">
                    </div>
                </div>

                <div
                  :class="{
                    'opacity-50': timeIsOpen(jadwalSholat.date,jadwalSholat.isya)==false,
                    'bg-white':presIsya.status == null,
                    'bg-green-300':presIsya.status == 'berjamaah',
                    'bg-yellow-300':presIsya.status == 'munfarid',
                    'bg-red-500':presIsya.status == 'tidak sholat',
                  }"
                  class="relative w-full flex justify-between items-center mb-4 py-4 px-5 rounded-full overflow-hidden shadow-md shadow-black/10">
                    <div
                      v-if="timeIsOpen(jadwalSholat.date,jadwalSholat.isya)==false" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0">
                    </div>
                    <div
                      v-if="objectIsEmpty(presIsya)==true" 
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-neutral-400/80 text-neutral-900/80 italic">
                        absen belum tersedia
                    </div>
                    <div
                      v-if="presIsya.check_status =='sedang'" 
                      @click="konfirmasiSholat($event,presIsya.uniqid,presIsya.sholat,presIsya.status)"
                      :class="{
                        'bg-green-300/90':presIsya.status == 'berjamaah',
                        'bg-yellow-300/90':presIsya.status == 'munfarid',
                        'bg-red-500/90':presIsya.status == 'tidak sholat',
                      }"
                      class="absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center text-neutral-900/60 italic">
                        <p :class="{'border-b border-neutral-900/80':privilege=='parent'}">
                          {{ privilege == 'student' ? 'dalam pemeriksaan' : 'butuh konfirmasi' }}
                        </p>
                    </div>
                    <div 
                      class="w-auto flex items-center">
                        <img src="../assets/images/moon.png" class="w-8 opacity-80">
                        <p class="text-sm ml-4 text-neutral-900/90">Isya</p>
                    </div>
                    <div 
                      class="w-auto flex items-center text-neutral-900/90">
                        <p class="text-sm mr-4">
                          {{ jadwalSholat.isya }}
                        </p>
                        <img 
                          v-if="presIsya.status != null" 
                          src="../assets/images/checkbox.svg" class="w-5 opacity-80">
                        <img 
                          v-if="presIsya.status == null"
                          :class="{'opacity-0':privilege=='parent','opacity-80':privilege=='student'||privilege==null}" 
                          @click="updateSholat($event,presIsya.uniqid,presIsya.sholat)"
                          src="../assets/images/checkboxempty.svg" class="w-5">
                    </div>
                </div>

            </div>

          </main>

      </section>
    </ion-content>
</template>

<script>
import { IonRefresher, IonRefresherContent, IonContent } from '@ionic/vue'
import { computed, defineComponent, onMounted } from 'vue';
import { getLocalStorage } from '@/services/localstorage.service';
import FormStatusSholat    from '@/components/FormStatusSholat.vue';
import FormConfirmSholat   from '@/components/FormConfirmSholat.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkedAlt }  from '@fortawesome/free-solid-svg-icons'
import { useStore }  from 'vuex';
import { useRouter } from 'vue-router';
import Swal          from 'sweetalert2';

export default defineComponent({
  name: 'PresensiView',
  components: {
    FormStatusSholat,FormConfirmSholat,
    IonRefresher, 
    IonRefresherContent,
    IonContent,
    FontAwesomeIcon,
  },
  setup() {
    // instance
    const store  = useStore();
    const router = useRouter();

    let region = computed(() => {
      return getLocalStorage("userregion") ? getLocalStorage("userregion") : {};
    });
    let userdata = computed(() => {
      return getLocalStorage("userdata")
    });
    let hijriah = computed(() => {
      return store.state.presensiapi.hijriah;
    });
    let jadwalSholat = computed(() => {
      return store.state.presensiapi.jadwalSholat;
    });
    let privilege = computed(() => {
      return store.state.presensiapi.privilege;
    });
    let presSubuh = computed(() => {
      return store.state.presensiapi.subuh;
    });
    let presDzuhur = computed(() => {
      return store.state.presensiapi.dzuhur;
    });
    let presAshar = computed(() => {
      return store.state.presensiapi.ashar;
    });
    let presMagrib = computed(() => {
      return store.state.presensiapi.magrib;
    });
    let presIsya = computed(() => {
      return store.state.presensiapi.isya;
    });

    let nextPrayTime = computed(() => {
      let nexttime     = "_ _:_ _";
      let currentUnix  = new Date().getTime();
      let jadwalSholat = store.state.presensiapi.jadwalSholat;

      if (jadwalSholat.date != "_ _:_ _") {
        if (currentUnix < new Date(`${jadwalSholat.date} ${jadwalSholat.isya}`).getTime() 
            || 
            currentUnix >= new Date(`${jadwalSholat.date} ${jadwalSholat.isya}`).getTime()) {
          nexttime = jadwalSholat.isya+":00";
        }
        if (currentUnix < new Date(`${jadwalSholat.date} ${jadwalSholat.magrib}`).getTime()) {
          nexttime = jadwalSholat.magrib+":00";
        }
        if (currentUnix < new Date(`${jadwalSholat.date} ${jadwalSholat.ashar}`).getTime()) {
          nexttime = jadwalSholat.ashar+":00";
        }
        if (currentUnix < new Date(`${jadwalSholat.date} ${jadwalSholat.dzuhur}`).getTime()) {
          nexttime = jadwalSholat.dzuhur+":00";
        }
        if (currentUnix < new Date(`${jadwalSholat.date} ${jadwalSholat.subuh}`).getTime()) {
          nexttime = jadwalSholat.subuh+":00";
        }
      }

      return nexttime;

    });

    const objectIsEmpty = computed(() => {

      return (obj) => {
        if (userdata.value != null) {
          for(var prop in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, prop)) {
              return false;
            }
          }

          return JSON.stringify(obj) === JSON.stringify({});
        }
        else {
          return false;
        }
      }
    });

    const timeIsOpen = (date,time) => {
      let currentUnix = new Date().getTime();
      let soonUnix    = new Date(`${date} ${time}`).getTime();

      if (isNaN(soonUnix)) {
        return false;
      }
      else {
        if (currentUnix>=soonUnix) {
          return true;
        }

        return false;
      }
    }

    const updateSholat = ($event,uniqid,sholatName) => {
      if (uniqid==null && sholatName == null) {
        Swal.fire({
            icon: 'warning',
            title: 'Anda belum login',
            text: 'segera login untuk menikmati fitur ini',
            showDenyButton: true,
            confirmButtonText: 'iya',
            denyButtonText: `tidak`,
            heightAuto: false
        }).then((result) => {
            Swal.close()
            if (result.isConfirmed) {
                router.push('/login');
            } 
        })
      }
      else {
        if (privilege.value == 'student') {
          store.commit("presensiapi/SET_UNIQID",uniqid);
          store.commit("presensiapi/SET_SHOLATNAME",sholatName);
          store.commit("formStatusSholatUx/SET_SHOW_FORM",true);
        }
      }
    }

    const konfirmasiSholat = ($event,uniqid,sholatName,status) => {
      if (privilege.value == 'student') {
        return 0;
      }

      store.commit("presensiapi/SET_UNIQID",uniqid);
      store.commit("presensiapi/SET_SHOLATNAME",sholatName);
      store.commit("presensiapi/SET_STATUS",status);
      store.commit("formKonfirmSholatUx/SET_SHOW_FORM",true);
    }

    const getAllData = () => {
      const userData = getLocalStorage("userdata");
      store.dispatch("presensiapi/GET_HIJRIAH");
      store.dispatch("presensiapi/GET_JADWAL");

      if (userData != null) {
        store.dispatch("presensiapi/GET_PRESENSI");
      } 
    }

    const doRefresh = (event) => {
      event.target.complete();
      getAllData();
    }

    onMounted(() => {
      getAllData();
    })

    return {
      faMapMarkedAlt,
      userdata,
      nextPrayTime,
      region,
      hijriah,
      jadwalSholat,
      timeIsOpen,
      objectIsEmpty,
      privilege,
      presSubuh,
      presDzuhur,
      presAshar,
      presMagrib,
      presIsya,
      updateSholat,
      konfirmasiSholat,
      doRefresh,
    }

  }
});
</script>

<style scoped>
  .bg-masjid1{
    background-image: url(../assets/images/masjid1.jpeg);
  }
</style>