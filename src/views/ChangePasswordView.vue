<template>
    <!-- Container -->
    <section
      id="container_profile"
      class="w-full flex-1 flex flex-col overflow-hidden">
        
        <!-- container scrolling -->
        <form
          @submit.prevent="updateProfile"
          class="min-h-max max-h-full flex flex-col px-6 items-center overflow-auto">

            <!-- back to profile -->
            <router-link 
              to="/profile" 
              class="relative flex justify-center items-center w-full pt-6 text-neutral-700/90">
                <font-awesome-icon class="absolute left-0 text-2xl xs:text-3xl" :icon="faAngleLeft"/>
                <div class="text-center text-xl xs:text-2xl">Ubah Password</div>
            </router-link>

            <!-- Password Lama -->
            <div
              class="floating_label relative w-full mt-16">
                <input 
                  @keyup="clearOldPassError"
                  type="password" autocomplete="off" name="old_password" placeholder="Password Lama"
                  :class="{'border-red-500':oldPasswordError,'border-neutral-500':oldPasswordError==null}"
                  class="w-full relative z-10 px-4 py-4 text-xl xs:text-2xl text-neutral-700 bg-transparent focus:outline-none placeholder-transparent border rounded">
                <span
                  class="absolute -z-0 top-5 left-4 text-md text-neutral-500 duration-300">
                    Password Lama</span>
            </div>
            <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                {{ oldPasswordError }}
            </div>

            <!-- Password Baru -->
            <div
              class="floating_label relative w-full mt-10">
                <input 
                  @keyup="clearPassError"
                  type="password" autocomplete="off" name="password" placeholder="Password Baru"
                  :class="{'border-red-500':passwordError,'border-neutral-500':passwordError==null}"
                  class="w-full relative z-10 px-4 py-4 text-xl xs:text-2xl text-neutral-700 bg-transparent focus:outline-none placeholder-transparent border rounded">
                <span
                  class="absolute -z-0 top-5 left-4 text-md text-neutral-500 duration-300">
                    Password Baru</span>
            </div>
            <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
              {{ passwordError }}
            </div>

            <!-- Btn Simpan -->
            <button
              class="w-full mt-12 py-4 bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-400 text-neutral-600 text-center font-bold duration-300 rounded-full">
                SIMPAN
            </button>

        </form>

    </section>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { FontAwesomeIcon }           from '@fortawesome/vue-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useStore }    from 'vuex';

export default defineComponent({
  name: 'ChangePasswordView',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    // instance
    const store = useStore();

    // vuex state 
    const passwordError = computed(() => {
      return store.state.profileapi.passwordError;
    });
    const oldPasswordError = computed(() => {
      return store.state.profileapi.oldPasswordError;
    });

    // vuex mutation
    const clearPassError = () => {
      store.commit("profileapi/SET_PASSWORD_ERROR",null);
    }
    const clearOldPassError = () => {
      store.commit("profileapi/SET_OLDPASSWORD_ERROR",null);
    }

    // vuex action
    const updateProfile = (event) => {
        
      const formProfile = new FormData(event.target); 

      store.dispatch("profileapi/DO_UPDATE_PROFILE",formProfile);

    }

    return {
      faAngleLeft,
      updateProfile,
      passwordError,
      oldPasswordError,
      clearPassError,
      clearOldPassError,
    }

  }
});
</script>