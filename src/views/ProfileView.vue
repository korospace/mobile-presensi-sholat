<template>
    <!-- Container -->
    <section
      id="container_profile"
      class="w-full flex-1 flex flex-col overflow-hidden">
        
        <!-- container scrolling -->
        <div
          class="min-h-max max-h-full flex flex-col px-6 items-center overflow-auto">

            <!-- img profile -->
            <div 
              class="w-24 h-24 mt-12 bg-white rounded-full overflow-hidden shadow-md shadow-neutral-700/30">
                <img 
                  src="../assets/images/profile.webp" alt="profile" 
                  class="w-full h-full">
            </div>

            <!-- nama lengkap -->
            <div
              class="floating_label relative w-full mt-14">
                <input 
                  v-model="profile.nama_lengkap"
                  type="text" autocomplete="off" name="nama_lengkap" placeholder="Nama Lengkap Siswa"
                  class="w-full relative z-10 px-4 py-4 text-xl xs:text-2xl text-neutral-700 bg-transparent focus:outline-none placeholder-transparent border border-neutral-500 rounded" disabled>
                <span
                  class="absolute -z-0 top-5 left-4 text-md text-neutral-500 duration-300">
                    Nama Lengkap Siswa</span>
            </div>

            <!-- nis -->
            <div
              class="floating_label relative w-full mt-12">
                <input 
                  v-model="profile.nis"
                  type="text" autocomplete="off" name="nis" placeholder="Nomor Induk Siswa"
                  class="w-full relative z-10 px-4 py-4 text-xl xs:text-2xl text-neutral-700 bg-transparent focus:outline-none placeholder-transparent border border-neutral-500 rounded" disabled>
                <span
                  class="absolute -z-0 top-5 left-4 text-md text-neutral-500 duration-300">
                    Nomor Induk Siswa</span>
            </div>

            <!-- link change password -->
            <router-link 
              to="/changepassword" 
              class="flex justify-between items-center w-full mt-8 py-4 pl-2 pr-4 text-neutral-700/90 border-b border-neutral-400">
                <div 
                  class="flex items-center">
                    <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faKey"/>
                    <div class="ml-4 text-xl xs:text-2xl">Password</div>
                </div>
                <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faAngleRight"/>
            </router-link>

            <!-- logout -->
            <div 
              @click="doLogout" 
              class="flex justify-between items-center w-full mt-8 py-4 pl-2 pr-4 text-neutral-700/90 border-b border-neutral-400">
                <div 
                  class="flex items-center">
                    <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faSignOut"/>
                    <div class="ml-4 text-xl xs:text-2xl">Logout</div>
                </div>
                <font-awesome-icon class="text-2xl xs:text-3xl" :icon="faAngleRight"/>
            </div>

        </div>

    </section>
</template>

<script>
import { faAngleRight,faKey,faSignOut } from '@fortawesome/free-solid-svg-icons'
import { removeLocalStorage }        from '@/services/localstorage.service';
import { computed, defineComponent } from 'vue';
import { FontAwesomeIcon }           from '@fortawesome/vue-fontawesome'
import { useStore }  from 'vuex';
import { useRouter } from 'vue-router';
import Swal          from 'sweetalert2';

export default defineComponent({
  name: 'ProfileView',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    // instance
    const route = useRouter();
    const store = useStore();

    // vuex state 
    const privilege = computed(() => {
      return store.state.profileapi.data.privilege;
    });
    const profile = computed(() => {
      if (privilege.value == 'parent') {
        return store.state.profileapi.data.student;
      }

      return store.state.profileapi.data;
    });

    // logout
    const doLogout = () => {
      Swal.fire({
          icon: 'warning',
          title: 'Anda yakin ingin keluar?',
          showDenyButton: true,
          confirmButtonText: 'iya',
          denyButtonText: `tidak`,
          heightAuto: false
      }).then((result) => {
          Swal.close()

          if (result.isConfirmed) {
              removeLocalStorage('userdata');
              route.push('/');
          } 
      })
    }

    return {
      faAngleRight,faKey,faSignOut,
      profile,
      doLogout,
    }

  }
});
</script>