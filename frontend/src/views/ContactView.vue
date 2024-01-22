<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue';

function handleContactSubmit(formData: { name: string, email: string, message: string }) {
    // TODO: Connect to backend
    console.log(formData);
}
</script>

<template>
    <div class="mb-6">
        <span class="text-2xl font-semibold underline">Contact</span>
    </div>
    <ContactForm @submit="handleContactSubmit"/>
</template>