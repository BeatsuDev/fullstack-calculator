import { ref, computed } from "vue";
import { defineStore } from "pinia";

export type Calculation = { expression: string; answer: string };

export const useCalculatorHistoryStore = defineStore("calculatorHistory", () => {
    const calculationHistory = ref<Calculation[]>([]);
    const history = computed(() => calculationHistory.value);

    function addCalculation(calculation: Calculation) {
        calculationHistory.value.push(calculation);
    }

    return { history, addCalculation };
});
