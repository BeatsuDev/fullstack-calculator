import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCalculatorStore = defineStore("calculator", () => {
    // This is bad, ref: https://github.com/vuejs/pinia/discussions/2479
    const calculatorDisplay = ref("");
    const display = computed(() => calculatorDisplay.value);
    const displayingMessage = ref(false);

    function addInput(value: string) {
        if (displayingMessage.value) {
            calculatorDisplay.value = "";
            displayingMessage.value = false;
        }
        calculatorDisplay.value += value;
    }

    function clearDisplay() {
        calculatorDisplay.value = "";
    }

    function setDisplay(message: string) {
        calculatorDisplay.value = message;
        displayingMessage.value = true;
    }

    return { display, addInput, clearDisplay, setDisplay };
});
