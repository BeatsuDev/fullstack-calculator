import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BasicCalculator from "@/components/BasicCalculator.vue";

describe("HelloWorld", () => {
    it("renders all buttons", () => {
        const wrapper = mount(BasicCalculator);

        expect(wrapper.text()).toContain("0");
        expect(wrapper.text()).toContain("1");
        expect(wrapper.text()).toContain("2");
        expect(wrapper.text()).toContain("3");
        expect(wrapper.text()).toContain("4");
        expect(wrapper.text()).toContain("5");
        expect(wrapper.text()).toContain("6");
        expect(wrapper.text()).toContain("7");
        expect(wrapper.text()).toContain("8");
        expect(wrapper.text()).toContain("9");

        expect(wrapper.text()).toContain("+");
        expect(wrapper.text()).toContain("-");
        expect(wrapper.text()).toContain("*");
        expect(wrapper.text()).toContain("/");

        expect(wrapper.text()).toContain("=");
        expect(wrapper.text()).toContain("C");
    });
});
