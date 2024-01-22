<script setup lang="ts">
import { useCalculatorHistoryStore } from "@/stores/history";
import { storeToRefs } from "pinia";

const calculatorHistoryStore = useCalculatorHistoryStore();

const { history } = storeToRefs(calculatorHistoryStore);
</script>

<template>
    <div id="calculator-history-container" class="border-2 border-white rounded-xl p-5 box-content w-96 min-h-4 bg-gray-700 mx-auto text-ellipsis">
        <div class="mb-6">
            <span class="text-2xl font-semibold underline">History</span>
        </div>
        <div id="historic-calculations" class="flex flex-col-reverse">
            <div v-for="calculation in history" class="whitespace-nowrap text-ellipsis overflow-hidden text-center mb-1">
                <span>{{ calculation.expression }}</span> = <span class="font-semibold underline decoration-double">{{ calculation.answer }}</span>
            </div>
        </div>
    </div>
</template>