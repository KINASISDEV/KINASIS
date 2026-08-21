<script setup>
import { ref, watch, onMounted } from 'vue';

const isDarkMode = ref(false);

const applyMode = (dark) => {
    if (dark) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
    }
};

watch(isDarkMode, (newValue) => {
    applyMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
});

onMounted(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        isDarkMode.value = savedMode === 'true';
    } else {
        isDarkMode.value = document.documentElement.classList.contains('dark-mode');
    }
});
</script>

<template>
    <div class="toggle-switch">
        <input type="checkbox" id="toggle" class="toggle-input" v-model="isDarkMode" />
        <label for="toggle" class="toggle-label"></label>
    </div>
</template>

<style scoped>
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary-color);
    transition: 0.4s;
    border-radius: 24px;
}

.toggle-label::before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: var(--secondary-color);
    transition: 0.4s;
    border-radius: 50%;
}

.toggle-input:checked + .toggle-label {
    background-color: var(--primary-color);
}

.toggle-input:checked + .toggle-label::before {
    transform: translateX(26px);
}

.toggle-input:focus + .toggle-label {
    box-shadow: 0 0 1px var(--primary-color);
}
</style>