<template>
    <div class="dark">
        <h1 class="text-white dark:text-black">Welcome to the homepage</h1>
        <button @click="toggleDark">
            Toggle
        </button>
        <AppAlert>
        This is an auto-imported component
        </AppAlert>
    </div>
</template>

<script setup>

const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
}
</script>
  