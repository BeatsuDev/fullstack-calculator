<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

const formElement = ref<HTMLFormElement | null>(null);
const formData = reactive({
    name: "",
    email: "",
    message: "",
});

// Define form submit event
const emit = defineEmits<{
    submit: [formData: typeof formData]
}>();

const formDataRules = {
    name: { required },
    email: { required, email },
    message: { required, minLength: minLength(10) },
};

async function handleSubmit() {
    if (!formElement.value) return;

    const newFormData = new FormData(formElement.value);
    const data = Object.fromEntries(newFormData.entries());
    Object.assign(formData, data);

    const isValid = await v$.value.$validate();
    if (!isValid) return;

    emit("submit", toRaw(formData));
}

const v$ = useVuelidate(formDataRules, formData);
const inputCss = "border-2 border-white rounded-md p-2 bg-gray-700";
</script>

<template>
    <div id="contact-container" class="border-2 border-white rounded-xl p-5 bg-gray-700">
        <form ref="formElement" id="contact-form" @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div class="flex flex-col">
                <label for="name" class="text-lg mb-2">Name</label>
                <input type="text" id="name" name="name" @change="v$.name.$reset()" :class="inputCss + ' ' + (v$.name.$error ? 'border-red-500' : 'border-white')"/>
                <span v-if="v$.name.$error" class="ml-2 italic text-red-500">{{ v$.name.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col">
                <label for="email" class="text-lg mb-2">Email</label>
                <input type="email" id="email" name="email" @change="v$.email.$reset()" :class="inputCss + ' ' + (v$.email.$error ? 'border-red-500' : 'border-white')" />
                <span v-if="v$.email.$error" class="ml-2 italic text-red-500">{{ v$.email.$errors[0].$message }}</span>
            </div>
            <div class="flex flex-col">
                <label for="message" class="text-lg mb-2">Message</label>
                <textarea id="message" name="message" @change="v$.message.$reset()" :class="inputCss + ' ' + (v$.message.$error ? 'border-red-500' : 'border-white')"></textarea>
                <span v-if="v$.message.$error" class="ml-2 italic text-red-500">{{ v$.message.$errors[0].$message }}</span>
            </div>
            <div class="flex justify-center">
                <button type="submit" class="hover:bg-gray-50 hover:text-gray-900 duration-75" :class="inputCss">Submit</button>
            </div>
        </form>
    </div>
</template>