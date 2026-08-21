<script setup>
import Header from './Header.vue'
import background1 from '../utils/background1.vue';
import Footer from '../utils/Footer.vue';
import AboutUs from './AboutUs.vue';
import Team from './Team.vue';
import Services from './Services.vue';
import WorkFlow from './WorkFlow/WorkFlow.vue';
import Tech from './Tech.vue';
</script>

<template>
    <background1 />
    <Header />
    <div class="pages">
        <AboutUs />
        <Team />
        <WorkFlow />
        <Services />
        <Tech />
    </div>
    <Footer />
</template>

<style scoped>
</style>