<script setup>
import SliderMode from '../utils/SliderMode.vue';
</script>

<template>
    <div class="background">
        <router-link to="/">
            <div class="logo_kinasis">
                <img src="/general_assets/logo_white.png" class="logo-light"/>
                <img src="/general_assets/logo_dark.png" class="logo-dark"/>
            </div>
        </router-link>

        <a href="/">
            <div class="button-style-3">
                <h3>Volver</h3>
            </div>
        </a>

        <div class="separator"></div>

        <a href="https://github.com/KINASISDEV" target="_blank">
            <div class="button-style-2">
                <img src="/general_assets/logo_gh.png"/>
            </div>
        </a>
        <a href="https://www.linkedin.com/company/kinasis-dev/" target="_blank">
            <div class="button-style-2">
                    <img src="/general_assets/logo_ln.png"/>
            </div>
        </a>
        <a href="https://www.instagram.com/kinasis_dev/" target="_blank">
            <div class="button-style-2">
                    <img src="/general_assets/logo_ig.png"/>
            </div>
        </a>
        <div class="left-separation">
            <router-link to="/website">
                <div class="button-style-1">
                        <h3>Sobre Nosotros</h3>
                </div>
            </router-link>
            <router-link to="/ecommerce">
                <div class="button-style-1">
                        <h3>Tienda Online</h3>
                </div>
            </router-link>
            <div class="separator"></div>
            <SliderMode />
        </div>
    </div>
</template>

<style scoped>

a {
    text-decoration: none;
    color: inherit;
}

img {
    transition: filter 0.3s ease;
}

.dark-mode .button-style-2 img {
    filter: invert(1);
}

.background {
    background: transparent;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(3px);
    width: calc(100% - 78px);
    box-sizing: border-box;
    position: sticky;
    top: 10px;
    z-index: 10;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--primary-color) 35%, transparent);
    border-radius: 999px;
    margin: 0 auto;
    box-shadow: 
        0 10px 28px -18px var(--shadow-color),
        0 0 14px var(--shadow-color);
}

.logo_kinasis img {
    width: 35px;
    height: auto;
    margin: 0;
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

.button-style-1, .button-style-2, .button-style-3, .logo_kinasis {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    vertical-align: middle;
}

.button-style-1 {
    transition: transform 0.15s ease;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    font-size: 16px;
    padding-bottom: 5px;
    padding-top: 5px;
    box-shadow: 0 5px var(--shadow-color);
    transition: all 0.1s ease;
}

.button-style-1:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border-color: var(--primary-color);
}

.button-style-1:active {
    transform: scale(0.85);
    transform: translateY(4px);
    box-shadow: 0 1px var(--shadow-color);
}

.separator {
    display: inline-block;
    width: 1px;
    height: 30px;
    background-color: var(--primary-color);
    margin-left: 20px;
    margin-right: 20px;
    vertical-align: middle;
}

.button-style-2 img{
    width: 28px;
    height: 28px;
    transition: all 0.3s ease;
}

.button-style-2 img:hover {
    transform: scale(1.2);
    filter: invert(0) drop-shadow(0 0 10px var(--primary-color));
}

.dark-mode .button-style-2 img:hover {
    filter: invert(1) drop-shadow(0 0 10px var(--primary-color));
}

.left-separation {
    margin-top: 10px;
    float: right;
    margin-right: 20px;
}

.button-style-3 {
    background-color: transparent;
    color: var(--primary-color);
    font-size: 16px;
    padding-bottom: 5px;
    padding-top: 5px;
    border: 1px solid var(--primary-color);
    transition: all 0.1s ease;
    cursor: pointer;
}

.button-style-3:hover {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.button-style-3:active {
    transform: scale(0.85);

}
</style>