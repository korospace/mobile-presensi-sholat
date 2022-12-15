<template>
    <transition name="fade">
        <div
          v-if="showLoading"
          class="fixed z-50 top-0 bottom-0 left-0 right-0 px-3 flex flex-col justify-center items-center"
          style="background-color: rgba(0,0,0,0.2);">
            <transition name="bounce" appear>
                <div
                  class="px-5 py-4 rounded-md bg-white shadow-2xl flex justify-center items-center">
                    <div class="w-8 xs:w-12">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#737373" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                    </div>
                    <p
                      class="ml-4 tracking-wide text-lg xs:text-2xl text-neutral-600">
                        {{ loadingText }}
                    </p>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex"

export default {
    name: "LoadingComponent",
    components: {
    },
    setup(){
        // instance
        const store = useStore();

        // vuex data
        const showLoading = computed(() => {
            return store.state.loadingux.data.show;
        });

        const loadingText = computed(() => {
            return store.state.loadingux.data.text;
        });

        return{
            showLoading,
            loadingText
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

    .bounce-enter-active{
        animation: bounce-inA .2s;
    }
    .bounce-leave-active{
        animation: bounce-inA .1s reverse;
    }
    @keyframes bounce-inA {
        0% {
            transform: scale(0.6);
        }
        50% {
            transform: scale(0.85);
        }
        100% {
            transform: scale(1);
        }
    }
</style>