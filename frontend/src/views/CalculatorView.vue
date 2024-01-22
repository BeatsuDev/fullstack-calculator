<script setup lang="ts">
import BasicCalculator from "@/components/BasicCalculator.vue";
import CalculatorHistory from "@/components/CalculatorHistory.vue";
</script>

<template>
    <h1 class="mb-4 w-full text-center">Calculator</h1>
    <div class="flex justify-center flex-col lg:flex-row text-center">
        <BasicCalculator />
        <CalculatorHistory class="mt-12 lg:ml-16" />
    </div>
</template>
