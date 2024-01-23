import { describe, it, expect, beforeAll } from "vitest";

import { mount } from "@vue/test-utils";
import ContactForm from "@/components/ContactForm.vue";

describe("Calculator functions", () => {
    let wrapper: ReturnType<typeof mount>;

    beforeAll(() => {
        wrapper = mount(ContactForm);
    });

    it("should render correct text labels for each field", () => {
        const fields = wrapper.findAll("label");
        const fieldTexts = fields.map(field => field.text());

        expect(fieldTexts).toEqual(["Name", "Email", "Message"]);
    });

    it("should render inputs for each field", () => {
        const inputs = wrapper.findAll("input");
        expect(inputs.length).toBe(2);

        const textareas = wrapper.findAll("textarea");
        expect(textareas.length).toBe(1);

        const allInputs = [...inputs, ...textareas];

        // Check labels are associated in correct order
        expect(allInputs[0].attributes("id")).toBe("name");
        expect(allInputs[1].attributes("id")).toBe("email");
        expect(allInputs[2].attributes("id")).toBe("message");
    });

    it("should render a submit button", () => {
        const submitButton = wrapper.find("button");
        expect(submitButton.text()).toBe("Submit");
    });

    /* TODO: Fix
    it("should emit submit event when submit button is clicked", async () => {
        const nameInput = wrapper.find("input#name");
        const emailInput = wrapper.find("input#email");
        const messageInput = wrapper.find("textarea#message");

        // First fill out the inputs with valid data
        await nameInput.setValue("John Doe");
        await emailInput.setValue("john.doe@example.com");
        await messageInput.setValue("A 10+ character long message.");

        console.log((wrapper.vm.$refs.formElement as HTMLFormElement).outerHTML);

        console.log(nameInput.element.value);
        console.log(emailInput.element.value);
        console.log(messageInput.element.value);
        
        const submitButton = wrapper.find("button");
        await submitButton.trigger("click");

        expect(wrapper.emitted()).toHaveProperty("submit");
    });
    */
});
