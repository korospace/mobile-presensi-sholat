<template>
    
    <transition name="fade">
        
        <!-- Container -->
        <div
          v-if="isShowForm"
          id="container_form"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50">
            
            <transition name="slide" appear>
                
                <!-- Form -->
                <div
                  class="w-full max-w-xs min-h-fit flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        Konfirmasi Sholat
                    </header>

                    <!-- body -->
                    <main
                      class="flex-1 flex flex-col justify-center items-center px-4 pt-6 pb-6">

                        <div class="w-full pb-8 text-left text-lg text-neutral-900/80">
                            <table>
                                <tr>
                                    <td class="font-bold">sholat</td>
                                    <td>: {{ sholatName }}</td>
                                </tr>
                                <tr>
                                    <td class="font-bold">status</td>
                                    <td>: {{ status }}</td>
                                </tr>
                            </table>
                        </div>

                        <button
                         @click.prevent="konfirmSholat"
                         class="w-full py-3 font-bold text-center text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded">
                            konfirmasi
                        </button>

                        <p @click="closeForm" class="mt-4 text-neutral-900/80 underline">
                            keluar
                        </p>
                    
                    </main>

                </div>

            </transition>

        </div>

    </transition>

</template>

<script>
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
// import Swal         from 'sweetalert2';

export default {
    name: "FormConfirmSholat",
    components: {
    },
    setup(){
        const store = useStore();

        const sholatName = computed(() => {
            return store.state.presensiapi.sholatName;
        })

        const status = computed(() => {
            return store.state.presensiapi.status;
        })

        const isShowForm = computed(() => {
            return store.state.formKonfirmSholatUx.show;
        })

        const closeForm = () => {
            store.commit("formKonfirmSholatUx/SET_SHOW_FORM",false);
        }

        const konfirmSholat = () => {
            store.dispatch("presensiapi/DO_CONFIRM");
        }

        return {
            sholatName,
            status,
            isShowForm,
            closeForm,
            konfirmSholat,
        }
    }
}
</script>

<style scoped>
    .fade-enter-active{
        animation: fade .4s;
    }
    .fade-leave-active{
        animation: fade .2s reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .slide-enter-active{
        animation: slide-in .4s;
    }
    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateY(-20px)
        }
        100% {
            opacity: 1;
            transform: translateY(0px)
        }
    }
</style>