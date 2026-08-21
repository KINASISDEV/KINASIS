<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMembers, getAllMembers } from '../utils/api.js';
import { shouldShowRouteHeader } from '../utils/calls.js';

import Background1 from '../utils/background1.vue';
import Header from './Header.vue';
import Footer from '../utils/Footer.vue';

const members = ref([]);
const notMembers = ref([]);
const foundersImages = ref([]);
const isLoading = ref(true);
const loadErrorMembers = ref('');
const loadErrorNotMembers = ref('');
const loadErrorFounders = ref('');
const currentFounderIndex = ref(0);
let carouselInterval = null;

function createErrorMessage(error, members) {
    if(members == null || members.length === 0) {
        return 'Lo sentimos. No hay miembros disponibles.';
    }
    else if (error) {
        return 'Error al cargar miembros.';
    } 
    else {
        return '';      
    }
}

function nextFounder() {
    if (foundersImages.value.length > 0) {
        currentFounderIndex.value = (currentFounderIndex.value + 1) % foundersImages.value.length;
    }
}

function previousFounder() {
    if (foundersImages.value.length > 0) {
        currentFounderIndex.value = (currentFounderIndex.value - 1 + foundersImages.value.length) % foundersImages.value.length;
    }
}

const currentFounderImage = computed(() => {
    return foundersImages.value[currentFounderIndex.value] || null;
});

onMounted(async () => {
    const [adminPayload, otherPayload, foundersPayload] = await Promise.all([
        getMembers(true),
        getMembers(false),
        getAllMembers('data/allImages')
    ]);

    members.value = adminPayload.members;
    loadErrorMembers.value = createErrorMessage(adminPayload.error, members.value);
    notMembers.value = otherPayload.notMembers;
    loadErrorNotMembers.value = createErrorMessage(otherPayload.error, notMembers.value);
    foundersImages.value = foundersPayload.images || [];
    loadErrorFounders.value = foundersPayload.error ? 'Error al cargar imágenes de fundadores.' : '';
    isLoading.value = false;

    if (foundersImages.value.length > 0) {
        carouselInterval = setInterval(() => {
            nextFounder();
        }, 10000);
    }
});

onUnmounted(() => {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
});

const route = useRoute();
const showRouteHeader = computed(() => shouldShowRouteHeader(route.path));
</script>

<template>
    <template v-if="showRouteHeader">
        <Background1 />
        <Header />
    </template>
    <section class="founders">
        <div class="founders-header">
            <h1>Fundadores</h1>
            <p class="founders-intro">
                Los fundadores de Kinasis fueron visionarios que identificaron una oportunidad única en el panorama tecnológico global. 
                Con valentía y determinación, decidieron dar el salto que transformaría sus aspiraciones en realidad.
            </p>
            <p class="founders-intro">
                Todo comenzó con una ambición temprana y arriesgada: crear soluciones que trascendieran las expectativas convencionales. 
                Su compromiso inquebrantable con la innovación y la calidad se convirtió en los pilares fundamentales que nos definen hoy.
            </p>
        </div>

        <p v-if="isLoading" class="loading-text">Cargando fundadores...</p>
        <p v-else-if="loadErrorFounders" class="error-text">{{ loadErrorFounders }}</p>
        
        <div v-else-if="foundersImages.length > 0" class="carousel-container">
            <button class="carousel-arrow carousel-arrow-prev" @click="previousFounder" aria-label="Anterior fundador">
                &#10094;
            </button>
            
            <div class="carousel-image-wrapper">
                <img 
                    :src="currentFounderImage.url" 
                    :alt="currentFounderImage.key"
                    class="carousel-image"
                    loading="lazy"
                />
            </div>
            
            <button class="carousel-arrow carousel-arrow-next" @click="nextFounder" aria-label="Siguiente fundador">
                &#10095;
            </button>

            <div class="carousel-indicators">
                <span 
                    v-for="(_, index) in foundersImages" 
                    :key="index"
                    class="indicator"
                    :class="{ active: index === currentFounderIndex }"
                    @click="currentFounderIndex = index"
                    :aria-label="`Ir a fundador ${index + 1}`"
                ></span>
            </div>
        </div>
    </section>
    <section class="team-content">
        <p v-if="isLoading">Cargando equipo...</p>
        <div v-else class="team-sections">
            <div class="team-block">
            <h2>Nuestro Equipo</h2>
            <p v-if="loadErrorMembers">{{ loadErrorMembers }}</p>
            <div v-else class="cards-grid">
                <article v-for="member in members" :key="member.uuid || member.id" class="liquid-card">
                    <div class="member-photo-wrap">
                        <img
                            v-if="member.photoSrc"
                            :src="member.photoSrc"
                            :alt="`Foto de ${member.nombre}`"
                            class="member-photo"
                            loading="lazy"
                        />
                    </div>
                    <h3>{{ member.nombre }}</h3>
                    <p class="member-roles">{{ Array.isArray(member.roles) ? member.roles.join(' / ') : member.roles }}</p>

                    <div class="icon-container">
                        <a v-if="member.portafolio" :href="member.portafolio" target="_blank" rel="noopener noreferrer" aria-label="Portafolio">
                            <div class="icon-wrapper">
                                <img src="/card_icons/portafolio.png" alt="portafolio" />
                            </div>
                        </a>
                        <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <div class="icon-wrapper">
                                <img src="/card_icons/linkedin.png" alt="linkedin" />
                            </div>
                        </a>
                        <a v-if="member.github" :href="member.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <div class="icon-wrapper">
                                <img src="/card_icons/github.png" alt="github" />
                            </div>
                        </a>
                        <a v-if="member.cv" :href="member.cv" target="_blank" rel="noopener noreferrer" aria-label="CV">
                            <div class="icon-wrapper">
                                <img src="/card_icons/cv.png" alt="cv" />
                            </div>
                        </a>
                    </div>
                </article>
            </div>
            </div>

            <div class="team-block">
            <h2>Otros colaboradores</h2>
            <p>En Kinasis, Apoyamos el talento, es por eso que, si tal vez buscas un proyecto particular, te recomendamos estos perfiles.</p>
            <p v-if="loadErrorNotMembers">{{ loadErrorNotMembers }}</p>
            <div v-else class="cards-grid">
                <article v-for="notMember in notMembers" :key="notMember.uuid || notMember.id" class="liquid-card">
                    <div class="member-photo-wrap">
                        <img
                            v-if="notMember.photoSrc"
                            :src="notMember.photoSrc"
                            :alt="`Foto de ${notMember.nombre}`"
                            class="member-photo"
                            loading="lazy"
                        />
                    </div>
                    <h3>{{ notMember.nombre }}</h3>
                    <p class="member-roles">{{ Array.isArray(notMember.roles) ? notMember.roles.join(' / ') : notMember.roles }}</p>

                    <div class="icon-container">
                        <a v-if="notMember.portafolio" :href="notMember.portafolio" target="_blank" rel="noopener noreferrer" aria-label="Portafolio">
                            <div class="icon-wrapper">
                                <img src="/card_icons/portafolio.png" alt="portafolio" />
                            </div>
                        </a>
                        <a v-if="notMember.linkedin" :href="notMember.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <div class="icon-wrapper">
                                <img src="/card_icons/linkedin.png" alt="linkedin" />
                            </div>
                        </a>
                        <a v-if="notMember.github" :href="notMember.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <div class="icon-wrapper">
                                <img src="/card_icons/github.png" alt="github" />
                            </div>
                        </a>
                        <a v-if="notMember.cv" :href="notMember.cv" target="_blank" rel="noopener noreferrer" aria-label="CV">
                            <div class="icon-wrapper">
                                <img src="/card_icons/cv.png" alt="cv" />
                            </div>
                        </a>
                    </div>
                </article>
            </div>
            </div>
        </div>
    </section>

    <template v-if="showRouteHeader">
        <Footer />
    </template>
</template>

<style scoped>
.team-content {
    min-height: 50vh;
    padding: 2rem;
    text-align: center;
    color: var(--text-color);
}

.team-sections {
    display: grid;
    gap: 1.5rem;
}

.team-block {
    padding: 1rem;
    border-radius: 18px;
}

.team-block h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--primary-color) 20%, var(--gradient-color) 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.team-block p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-weight: 500;
    opacity: 0.95;
}


.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    justify-items: center;
}

.liquid-card {
    color: var(--primary-color);
    position: relative;
    width: 260px;
    min-height: 385px;
    border-radius: 30px;
    overflow: hidden;
    padding: 1.5rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    background: transparent;
    background-size: 400% 400%;
    animation: gradientShift 10s ease infinite;
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(14px) saturate(160%);
    box-shadow: 0 10px 30px var(--shadow-color), inset 0 1px 2px var(--primary-color);
    transition: all 0.4s ease;
    cursor: pointer;
}

.liquid-card:hover {
    color: var(--text-color);
    transform: translateY(-10px) scale(1.03);
    background: var(--primary-color);
    background-size: 300% 300%;
    box-shadow: 0 15px 45px var(--shadow-color), inset 0 2px 4px var(--primary-color);
    animation: none;
}

.member-photo-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 180px;
    margin-bottom: 1rem;
}

.member-photo {
    width: 144px;
    height: 144px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
}

.liquid-card h3 {
    font-size: 18px !important;
    margin-bottom: 0.6rem;
}

.member-roles {
    font-size: 15px !important;
    opacity: 0.95;
}

.icon-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
}

.icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, background 0.3s ease;
}

.icon-wrapper:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.4);
}

.icon-wrapper img {
    width: 28px;
    height: 28px;
    transition: transform 0.4s ease, filter 0.4s ease;
}

.icon-wrapper:hover img {
    transform: scale(1.1);
    filter: brightness(1.2) drop-shadow(0 0 5px rgba(255, 255, 255, 0.6));
    animation: iconPulse 1s ease-in-out infinite alternate;
}

.founders {
    min-height: 70vh;
    padding: 4rem 2rem;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.founders-header {
    text-align: center;
    max-width: 900px;
    margin-bottom: 3rem;
}

.founders-header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--primary-color) 25%, var(--gradient-color) 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.founders-intro {
    text-align: justify;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-weight: 500;
    opacity: 0.95;
}


.carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
}

.carousel-image-wrapper {
    position: relative;
    width: 900px;
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 3px solid var(--primary-color);
    box-shadow: 0 8px 32px 0 color-mix(in srgb, var(--gradient-color) 30%, transparent),
                0 0 0 1px rgba(255, 255, 255, 0.1);
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: color-mix(in srgb, var(--gradient-color) 20%, transparent);
    backdrop-filter: blur(10px);
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.carousel-arrow:hover {
    background: color-mix(in srgb, var(--gradient-color) 20%, transparent);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 20px color-mix(in srgb, var(--gradient-color) 30%, transparent);
}

.carousel-arrow-prev {
    left: -60px;
}

.carousel-arrow-next {
    right: -60px;
}

.carousel-indicators {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    justify-content: center;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--gradient-color) 20%, transparent);
    border: 2px solid var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease;
}

.indicator.active {
    background: var(--primary-color);
    transform: scale(1.2);
    box-shadow: 0 0 10px color-mix(in srgb, var(--gradient-color) 20%, transparent);
}

.indicator:hover {
    background: color-mix(in srgb, var(--gradient-color) 20%, transparent);
}

.loading-text,
.error-text {
    font-size: 1.1rem;
    margin-top: 2rem;
}

.error-text {
    color: #ff6b6b;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes iconPulse {
    from { transform: scale(1.05); }
    to { transform: scale(1.15); }
}

@media (max-width: 768px) {
    .founders {
        min-height: auto;
        padding: 2rem 1rem;
    }

    .founders-header h1 {
        font-size: 2rem;
    }

    .founders-intro,
    .founders-description {
        font-size: 0.95rem;
    }

    .carousel-container {
        gap: 1rem;
    }

    .carousel-image-wrapper {
        width: 300px;
        height: 380px;
    }

    .carousel-arrow {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }

    .carousel-arrow-prev {
        left: -50px;
    }

    .carousel-arrow-next {
        right: -50px;
    }

    .carousel-indicators {
        bottom: -40px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
        gap: 1.2rem;
    }

    .liquid-card {
        width: min(100%, 290px);
    }
}
</style>