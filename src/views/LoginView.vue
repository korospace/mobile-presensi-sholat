<template>
    <!-- Container -->
    <section
      id="bg_dashboard"
      class="min-h-screen max-h-screen w-full bg-neutral-200">
        
        <!-- Container Max-Width -->
        <div class="min-h-screen max-h-screen w-full max-w-lg flex flex-col m-auto bg-white overflow-hidden">
        
            <!-- head -->
            <header
              class="w-full h-60 relative flex justify-center overflow-visible">
                
                <div class="w-full h-full bg-masjid1 bg-no-repeat bg-cover rounded-b-3xl overflow-hidden">

                  <!-- bg blur -->
                  <div
                    class="w-full h-full flex flex-col justify-start items-center px-10 bg-neutral-900/70">

                      <!-- switcher -->
                      <p class="text-neutral-200 text-md mt-8 mb-3">
                        masuk sebagai
                      </p>
                      <div
                        class="relative w-full flex bg-neutral-500 rounded cursor-pointer overflow-hidden">
                          <div
                            :class="{'translate-x-full': privilege=='parent'}"
                            class="w-1/2 absolute top-0 bottom-0 left-0 p-0.5 duration-300">
                              <div 
                                class="w-full h-full flex justify-center items-center text-neutral-600 bg-neutral-300 rounded-sm"> 
                                  <span>{{ privilege == 'student'?'siswa':'orangtua' }}</span> 
                              </div>
                          </div>
                          <div 
                            @click="changePrivilege($event,'student')"
                            class="w-1/2 text-center py-2.5 text-white/90 hover:bg-neutral-400 duration-500 rounded-r">siswa</div>
                          <div 
                            @click="changePrivilege($event,'parent')"
                            class="w-1/2 text-center py-2.5 text-white/90 hover:bg-neutral-400 duration-500 rounded-l">orangtua</div>
                      </div>

                  </div>
                </div>

                <!-- logo -->
                <div 
                  class="absolute -bottom-14 flex justify-center items-center w-28 h-28 pb-1.5 bg-white rounded-full overflow-hidden shadow-md shadow-neutral-700/30">
                    <img 
                      src="../assets/images/logo.png" alt="logo" 
                      class="w-24 h-24">
                </div>

            </header>

            <!-- Form -->
            <form 
              @submit.prevent="doLogin"
              class="w-full flex-1 flex flex-col justify-center items-center px-6 py-10">

                <!-- privilege -->
                <input type="hidden" name="privilege" :value="privilege">

                <!-- username -->
                <div
                  class="floating_label relative w-full">
                    <input 
                      @keyup="clearError"
                      type="text" name="username" id="username" placeholder="username" autocomplete="off"
                      :class="{'border-red-500':errorCredential==true,' border-neutral-500':errorCredential==false}"
                      class="w-full relative z-10 px-4 py-3 bg-transparent text-neutral-900/80 focus:outline-none placeholder-transparent border rounded">
                    <span
                      class="absolute -z-0 top-3 left-4 text-md text-neutral-500 duration-300">
                        Nomor Induk Siswa</span>
                </div>

                <!-- password -->
                <div
                  class="floating_label relative w-full mt-12">
                    <input 
                      @keyup="clearError"
                      type="password" name="password" id="password" placeholder="password"
                      :class="{'border-red-500':errorCredential==true,' border-neutral-500':errorCredential==false}"
                      class="w-full relative z-10 px-4 py-3 bg-transparent text-neutral-900/80 focus:outline-none placeholder-transparent border rounded">
                    <span
                      class="absolute -z-0 top-3 left-4 text-md text-neutral-500 duration-300">
                        Password</span>
                </div>

                <!-- btn login -->
                <button
                  class="w-full mt-12 py-4 bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-400 text-neutral-600 text-center font-bold duration-300 rounded-full">
                    LOGIN
                </button>

                <router-link 
                  to="/" 
                  class="mt-4 text-sm text-neutral-900/80 underline underline-offset-2">
                    halaman utama
                </router-link>

                <!-- error credential -->
                <!-- <div v-if="errorCredential" class="w-full mt-20 px-6 text-center text-red-600/70 text-lg">
                  <b>NIS</b> atau <b>password</b> yang anda masukan salah
                </div> -->

            </form>

        </div>

    </section>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore }        from 'vuex'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  setup() {
    // instance
    const store = useStore();

    // vuex state 
    const privilege = computed(() => {
      return store.state.loginux.privilege;
    });
    const errorCredential = computed(() => {
      return store.state.loginapi.errorCredential;
    });

    // vuex mutation
    const changePrivilege = (event,privilege) => {
      store.commit("loginux/SET_PRIVILEGE",privilege);
    }
    const clearError = () => {
      store.commit("loginapi/SET_ERROR_CREDENTIAL",false);
    }   

    // vuex action
    const doLogin = (event) => {

      clearError();
      
      const formLogin = new FormData(event.target); 
      
      store.dispatch("loginapi/DO_LOGIN",formLogin);

    }


    return {
      privilege,
      errorCredential,
      changePrivilege,
      clearError,
      doLogin,
    }
  }
});
</script>

<style scoped>
  .bg-masjid1{
    background-image: url(../assets/images/masjid1.jpeg);
  }
</style>