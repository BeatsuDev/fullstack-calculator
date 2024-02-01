<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header class="mb-12">
        <nav>
            <ul class="flex flex-row justify-around text-2xl w-3/5 min-w-[500px] mx-auto">
                <li>
                    <RouterLink id="route-to-home" to="/">Home</RouterLink>
                </li>
                <li>
                    <RouterLink id="route-to-contact" to="/contact">Contact</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
    <RouterView />
</template>
