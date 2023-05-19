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
                  @submit="filterOnChange"
                  v-slot="{ errors }"
                  :validation-schema="dateRangeValidation"
                  class="w-full max-w-xs min-h-fit flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        Range Tanggal
                    </header>

                    <!-- body -->
                    <main
                      class="flex-1 px-4 pb-6">

                        <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">dimulai</p>
                        <Field
                          type="date"
                          name="datestart"
                          v-model="dateStartVal"
                          :class="{'border-red-500':errors.datestart,'border-neutral-500':errors.datestart==null}"
                          class="w-full z-10 mt-2 px-4 py-3 text-neutral-800 focus:outline-none bg-transparent border rounded" />

                        <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">berakhir</p>
                        <Field
                          type="date"
                          name="dateend"
                          v-model="dateEndVal"
                          :class="{'border-red-500':errors.dateend,'border-neutral-500':errors.dateend==null}"
                          class="w-full z-10 mt-2 px-4 py-3 text-neutral-800 focus:outline-none bg-transparent border rounded" />
                    
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
import dateRangeValidation from '@/validations/DateRange'

export default {
    name: "FormDateRange",
    components: {
        Field, Form, // vee-validate
    },
    setup(props, { emit }){
        const store = useStore();

        const isShowForm = computed(() => {
            return store.state.formDateRangeUx.show;
        })

        let dateStartVal = computed({
            get() {
                return store.state.formDateRangeUx.dateStart;
            },
            set(val) {
                store.commit("formDateRangeUx/SET_DATESTART",val);
            }
        })

        let dateEndVal = computed({
            get() {
                return store.state.formDateRangeUx.dateEnd;
            },
            set(val) {
                store.commit("formDateRangeUx/SET_DATEEND",val);
            }
        })

        const filterOnChange = () => {
            emit('filterOnChange');
            closeForm();
        }

        const closeForm = () => {
            store.commit("formDateRangeUx/SET_SHOW_FORM",false);
        }

        return {
            isShowForm,
            dateStartVal,
            dateEndVal,
            closeForm,
            dateRangeValidation,
            filterOnChange,
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