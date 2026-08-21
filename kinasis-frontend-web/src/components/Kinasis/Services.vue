<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { shouldShowRouteHeader } from '../utils/calls.js';
import { getServices } from '../utils/api.js';
import Background1 from '../utils/background1.vue';
import Separator2 from '../utils/separator2.vue';
import Header from './Header.vue';
import Footer from '../utils/Footer.vue';

const route = useRoute();
const showRouteHeader = computed(() => shouldShowRouteHeader(route.path));

const services = ref([]);
const isLoading = ref(true);
const loadError = ref('');
const expandedServiceId = ref(null);

function toggleServiceExpand(serviceId) {
    expandedServiceId.value = expandedServiceId.value === serviceId ? null : serviceId;
}

function getServicesStellar(services) {
    const stellarServices = [];
    for (const service of services) {
        if (service.stellar) stellarServices.push(service);
    }
    return stellarServices;
}

function getServicesNonStellar(services) {
    const nonStellarServices = [];
    for (const service of services) {
        if (!service.stellar) nonStellarServices.push(service);
    }
    return nonStellarServices;
}

onMounted(async () => {
    try {
        const servicesList = await getServices();
        services.value = servicesList.services || [];
        if (!servicesList || servicesList.length === 0) {   
            loadError.value = 'No hay tecnologías disponibles.';
        }
    } catch (error) {
        loadError.value = 'Error al cargar las tecnologías.';
    } finally {
        isLoading.value = false;
    }
});

const stellarServicesList = computed(() => getServicesStellar(services.value));
const servicesList = computed(() => getServicesNonStellar(services.value));
</script>

<template>
    <template v-if="showRouteHeader">
        <Background1 />
        <Header />
    </template>
    <div class="content">
        <div class="title">
            <h1>Nuestros Servicios</h1>
        </div>
        <div v-if="isLoading">Cargando servicios...</div>
        <div v-else-if="loadError">{{ loadError }}</div>
        <div v-else class="services-list">
            <div v-for="service in stellarServicesList" :key="service.uuid" class="service-item">
                <div class="stellar-card">
                    <div class="stellar-content">
                        <img :src="service.photoSrc" alt="Icono del servicio" class="stellar-icon" />
                        <div class="stellar-text">
                            <h2 class="stellar-title">{{ service.tittle }}</h2>
                            <p class="stellar-description">{{ service.description }}</p>
                            <ul class="stellar-components">
                                <li v-for="component in service.components" :key="component" class="component-badge">{{ component }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Separator2/>
            <div class="title">
                <h1>Nuestros Principales Servicios</h1>
            </div>
            <div class="services-grid">
                <div v-for="service in servicesList" :key="service.uuid" class="service-item-wrapper">
                    <div class="services-card" @click="toggleServiceExpand(service.uuid)">
                        <div class="service-card-content">
                            <div class="service-card-text">
                                <h2>{{ service.tittle }}</h2>
                            </div>
                            <img :src="service.photoSrc" alt="Icono del servicio" class="service-card-icon" />
                        </div>
                    </div>
                    <div v-if="expandedServiceId === service.uuid" class="expanded-content">
                        <h4 class="service-card-description">{{ service.description }}</h4>
                        <ul class="service-components">
                            <li v-for="component in service.components" :key="component" class="service-component-badge">{{ component }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <template v-if="showRouteHeader">
        <Footer />
    </template>
</template>

<style scoped>
.content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}
.title {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
}
.title h1{
    font-size: 40px;
    color: var(--primary-color);
    transition: font-size 0.3s ease;

}
.title h1:hover {
    font-size: 42px;
    transition: font-size 0.3s ease;
}
.services-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
}
.service-item {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.stellar-card {
    background-color: var(--stellar-bg-color);
    color: var(--stellar-text-color);
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.stellar-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px var(--shadow-color);
}
.stellar-content {
    display: flex;
    gap: 40px;
    align-items: flex-start;
}
.stellar-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.stellar-title {
    text-align: center;
    font-size: 32px;
    color: var(--primary-color);
    margin: 0;
    transition: all 0.3s ease;
    text-shadow: 0 2px 8px var(--shadow-color);
}
.stellar-card:hover .stellar-title {
    transform: scale(1.05);
    text-shadow: 0 4px 12px var(--shadow-color);
}
.stellar-description {
    text-align: justify;
    margin: 0;
    line-height: 1.6;
    font-size: 16px;
}
.stellar-icon {
    width: 400px;
    height: 400px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 4px 12px var(--shadow-color);
}
.stellar-components {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    list-style: none;
    padding: 0;
    margin: 0;
}
.component-badge {
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid var(--shadow-color);
    color: var(--stellar-text-color);
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 14px;
    box-shadow: 0 2px 6px var(--shadow-color);
    transition: all 0.3s ease;
}
.component-badge:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px var(--shadow-color);
}
.services-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(400px, 500px));
    gap: 20px;
    justify-content: center;
    margin: 0 auto;
}
.service-item-wrapper {
    display: flex;
    flex-direction: column;
}
.services-card {
    background-color: var(--stellar-bg-color);
    color: var(--stellar-text-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}
.services-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px var(--shadow-color);
}
.services-card:hover::after {
    content: 'click me';
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--primary-color);
    color: var(--stellar-text-color);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.service-card-content {
    display: flex;
    gap: 20px;
    align-items: center;
}
.service-card-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.services-card h2 {
    font-size: 18px;
    color: var(--primary-color);
    margin: 0;
    text-align: center;
    text-shadow: 0 2px 3px var(--shadow-color);
}
.service-card-description {
    margin-bottom: 5px;
    font-size: 13px;
    line-height: 1.5;
    text-align: justify;
}
.service-card-icon {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
}
.service-components {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
}
.service-component-badge {
    background-color: var(--font-color);
    border: 1px solid var(--shadow-color);
    color: var(--stellar-text-color);
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: all 0.3s ease;
}
.service-component-badge:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 3px 6px var(--shadow-color);
}
.expanded-content {
    margin-top: 15px;
    padding: 20px;
    background-color: var(--primary-color);
    border-radius: 8px;
    color: var(--secondary-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: slideDown 0.3s ease;
}
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>