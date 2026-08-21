<script setup>
import Header from './Header.vue';
import background2 from '../utils/background2.vue';
import filters from './assets/filters.vue';
import Footer from '../utils/Footer.vue';
</script>

<template>
    <background2 />
    <Header />
    <div class="principal-page">
        <div class="content">
            <div class="head">
                <h1 class="tittle">KxP</h1>
                <filters />
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
.principal-page {
    background: transparent;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    color: var(--primary-color);
}

.content {
    display: flex;
    align-items: flex-start;
    position: sticky;
    top: 0;
}

.head {
    margin-top: 30px;
    margin-left: 50px;
    border: 1px solid var(--primary-color);
    border-radius: 20px;
    box-shadow:
        0 4px 10px 2px var(--shadow-color),
        0 0 8px var(--shadow-color);
    width: 15%;
    height: 100%;
    align-items: center;
    text-align: center;
}

.head .tittle {
    font-size: 3rem;
    font-weight: bold;
    margin: 10px;
    padding: 0;
}
</style>