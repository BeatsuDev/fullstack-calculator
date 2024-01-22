import { ref } from "vue";
import { defineStore } from "pinia";

export const useCalculatorHistoryStore = defineStore("calculatorHistory", () => {
    const history = ref<string[]>([]);

    function addCalculation(calculation: string, result: string) {
        history.value.push(calculation, result);
    }

    function getHistory() {
        return history.value;
    }

    return { addCalculation, getHistory };
});
