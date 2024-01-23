<script setup lang="ts">
import { useCalculatorStore } from "@/stores/calculator";
import { useCalculatorHistoryStore, type Calculation } from "@/stores/history";
import { storeToRefs } from "pinia";


const buttons = [
    { name: "7", type: "number", css: "" },
    { name: "8", type: "number", css: "" },
    { name: "9", type: "number", css: "" },
    { name: "/", type: "operator", css: "" },
    { name: "4", type: "number", css: "" },
    { name: "5", type: "number", css: "" },
    { name: "6", type: "number", css: "" },
    { name: "*", type: "operator", css: "" },
    { name: "1", type: "number", css: "" },
    { name: "2", type: "number", css: "" },
    { name: "3", type: "number", css: "" },
    { name: "-", type: "operator", css: "" },
    { name: "AC", type: "clear", css: "" },
    { name: "0", type: "number", css: "" },
    { name: "=", type: "equal", css: "" },
    { name: "+", type: "operator", css: "" },
] as const;

type ButtonType = typeof buttons[number]["type"];

function buttonCssFor(buttonType: ButtonType): string {
    switch (buttonType) {
        case "number":
            return "text-white bg-gray-500";
        case "operator":
            return "text-white bg-blue-500/50";
        case "clear":
            return "bg-red-500 text-white";
        case "equal":
            return "bg-yellow-500 text-white";
    }
}

const calculatorStore = useCalculatorStore();
const calculatorHistoryStore = useCalculatorHistoryStore();

const { display } = storeToRefs(calculatorStore);

function handleClick(button: (typeof buttons)[number]): void {
    switch (button.type) {
        case "number":
        case "operator":
            return calculatorStore.addInput(button.name);
        case "clear":
            return calculatorStore.clearDisplay();
        case "equal":
            return handleEqualsPressed();
        default:
            throw new Error("All button types were not handled in handleClick") as never;
    }
}

function handleEqualsPressed() {
    if (display.value === "") {
        return;
    }

    // TODO: Connect to backend
    const result: any = eval(display.value);

    if (typeof result !== "number") {
        throw new Error("Result is not a number");
    }

    const calculation: Calculation = {
        expression: display.value,
        answer: result.toString()
    };

    calculatorHistoryStore.addCalculation(calculation);
    calculatorStore.setDisplay(result.toString());
}
</script>

<template>
    <div id="calculator-container" class="border-2 border-white rounded-xl p-5 bg-gray-800 mx-auto">
        <div id="calculator-display" class="p-2 mb-4 border-2 border-white bg-gray-500 box-content h-8 text-2xl text-end align-middle">
            {{ display }}
        </div>
        <div id="calculator-buttons" class="grid grid-cols-4">
            <button
                class="m-1 p-4 text-2xl opacity-80 hover:opacity-100"
                v-for="button in buttons"
                :key="button.name"
                :class="`${button.css} ${buttonCssFor(button.type)}`"
                @click="handleClick(button)"
            >
                {{ button.name }}
            </button>
        </div>
    </div>
</template>
