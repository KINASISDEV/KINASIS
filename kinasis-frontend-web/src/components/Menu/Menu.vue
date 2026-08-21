<script setup>
import Header from './Header.vue'
import background1 from '../utils/background1.vue';
</script>

<template>
    <background1 />
    <Header />
    <div class="content">
        <div class="logo_kinasis">
            <img src="/general_assets/logo_white.png" class="logo-light"/>
            <img src="/general_assets/logo_dark.png" class="logo-dark"/>
        </div>
        <div class="tittle-head">
            <h1>KINASIS</h1>
            <h2>Desarrollo profesional con software de calidad.</h2>
        </div>
        <div class="buttons-bar">
            <router-link to="/website" class="button">Sitio Web</router-link>
            <router-link to="/ecommerce" class="button">Tienda Online</router-link>
        </div>
    </div>
</template>

<style scoped>

.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: calc(100vh - 60px);
    position: relative;
    z-index: 1;
}

.logo_kinasis img {
    width: 220px;
}

.logo_kinasis .logo-dark {
    display: none;
}

.dark-mode .logo_kinasis .logo-light {
    display: none;
}

.dark-mode .logo_kinasis .logo-dark {
    display: block;
}

.tittle-head h1{
    font-size: 120px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    color: var(--primary-color);
    text-shadow: 
        0 0 10px var(--primary-color),
        0 0 11px var(--secondary-color);
    letter-spacing: 5px;
}

.tittle-head h2{
    font-size: 30px;
}

.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border: none;
    margin: 80px;
    font-size: 20px;
    padding: 15px 15px;
    width:160px;
    border-radius: 15px;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    box-shadow: 0 5px var(--shadow-color);
    transition: all 0.3s ease;
    cursor: pointer;
}

.button:hover{
    transform: scale(1.15);
    box-shadow: 0 5px var(--shadow-color);
}

.button:active {
    transform: scale(0.85);
    transform: translateY(4px);
    box-shadow: 0 1px var(--shadow-color);
}

</style>