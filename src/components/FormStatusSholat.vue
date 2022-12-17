<template>
    
    <transition name="fade">
        
        <!-- Container -->
        <div
          v-if="isShowForm"
          id="container_form"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50">
            
            <transition name="slide" appear>
                
                <!-- Form -->
                <Form
                  @submit="statusOnChange"
                  class="w-full max-w-xs min-h-fit flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        Status Sholat
                    </header>

                    <!-- body -->
                    <main
                      class="flex-1 px-4 py-6">

                        <Field
                          as="select"
                          name="status"
                          v-model="statusVal"
                          class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border border-neutral-500 rounded">
                            <option value="berjamaah">berjamaah</option>
                            <option value="munfarid">munfarid</option>
                            <option value="tidak sholat">tidak sholat</option>
                        </Field>
                    
                    </main>

                    <!-- button -->
                    <footer
                      class="w-full flex items-center py-4 px-2 border-t border-neutral-400">

                        <button
                         class="w-1/2 py-3 font-bold text-center text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded">
                            simpan
                        </button>
                        <button
                         @click.prevent="closeForm"
                         class="w-1/2 text-neutral-700 hover:text-neutral-900 underline">
                            tutup
                        </button>

                    </footer>

                </Form>

            </transition>

        </div>

    </transition>

</template>

<script>
import { Field, Form } from "vee-validate";
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import Swal         from 'sweetalert2';

export default {
    name: "FormStatusSholat",
    components: {
        Field, Form, // vee-validate
    },
    setup(){
        const store = useStore();

        const isShowForm = computed(() => {
            return store.state.formStatusSholatUx.show;
        })

        const closeForm = () => {
            store.commit("formStatusSholatUx/SET_SHOW_FORM",false);
        }

        let statusVal = computed({
            get() {
                return store.state.presensiapi.status;
            },
            set(val) {
                store.commit("presensiapi/SET_STATUS",val);
            }
        })

        const statusOnChange = () => {
            Swal.fire({
                icon: 'warning',
                title: 'Jawaban jujur!',
                text: 'saya tidak berbohong dalam jawaban ini',
                showDenyButton: true,
                confirmButtonText: 'iya',
                denyButtonText: `tidak`,
                heightAuto: false
            }).then((result) => {
                Swal.close()
                if (result.isConfirmed) {
                    store.dispatch("presensiapi/DO_UPDATE");
                } 
            })
        }

        return {
            isShowForm,
            closeForm,
            statusVal,
            statusOnChange,
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