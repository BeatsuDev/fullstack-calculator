import { describe, beforeEach, it, vi, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

import { mount } from "@vue/test-utils";
import BasicCalculator from "@/components/BasicCalculator.vue";
import { useCalculatorStore } from "@/stores/calculator";
import { useCalculatorHistoryStore } from "@/stores/history";

describe("Calculator functions", () => {
    let numberButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let allButtons = [...numberButtons, "+", "-", "*", "/", "="];

    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(BasicCalculator, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, })],
            },
        });
    });

    it("renders all buttons", () => {
        for (let button of allButtons) {
            expect(wrapper.text()).toContain(button);
        }
    });

    it("clicking number buttons calls the store addInput method", async () => {
        const store = useCalculatorStore();

        const buttons = wrapper.findAll("button");
        const oneButton = buttons.filter((button) => button.text() === "1")[0];
        await oneButton.trigger("click");

        expect(store.addInput).toHaveBeenCalledWith("1");
    });

    it("renders the display from pinia store", async () => {
        const store = useCalculatorStore();

        store.addInput("1");
        store.addInput("2");
        store.addInput("3");
        await wrapper.vm.$nextTick();
        
        const display = wrapper.find("#calculator-display");
        expect(display.text()).toBe("123");
    });

    it("clicking the clear button calls the store clear method", async () => {
        const store = useCalculatorStore();

        const buttons = wrapper.findAll("button");
        const clearButton = buttons.filter((button) => button.text() === "AC")[0];
        await clearButton.trigger("click");

        expect(store.clearDisplay).toHaveBeenCalled();
    });

    it("clicking equals when display is empty should NOT call the calculator history store addCalculation method", async () => {
        const store = useCalculatorHistoryStore();

        const buttons = wrapper.findAll("button");
        const equalsButton = buttons.filter((button) => button.text() === "=")[0];
        await equalsButton.trigger("click");

        expect(store.addCalculation).not.toHaveBeenCalled();
    });

    it("clicking equals when display has a value should call the calculator history store addCalculation method", async () => {
        const store = useCalculatorHistoryStore();

        const buttons = wrapper.findAll("button");
        const oneButton = buttons.filter((button) => button.text() === "1")[0];
        const plusButton = buttons.filter((button) => button.text() === "+")[0];
        const equalsButton = buttons.filter((button) => button.text() === "=")[0]; 
        
        await oneButton.trigger("click");
        await plusButton.trigger("click");
        await oneButton.trigger("click");
        await equalsButton.trigger("click");

        await wrapper.vm.$nextTick();

        expect(store.addCalculation).toHaveBeenCalled();
    });

    it("clicking the equals button should call the calculation store setDisplay method", async () => {
        const store = useCalculatorStore();

        const buttons = wrapper.findAll("button");
        const oneButton = buttons.filter((button) => button.text() === "1")[0];
        const plusButton = buttons.filter((button) => button.text() === "+")[0];
        const equalsButton = buttons.filter((button) => button.text() === "=")[0]; 
        
        await oneButton.trigger("click");
        await plusButton.trigger("click");
        await oneButton.trigger("click");
        await equalsButton.trigger("click");

        await wrapper.vm.$nextTick();

        expect(store.setDisplay).toHaveBeenCalled();
    });
});
