<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { shouldShowRouteHeader } from '../utils/calls.js';
import { getCatalogByName } from '../utils/api.js';
import Background1 from '../utils/background1.vue';
import Separator2 from '../utils/separator2.vue';
import Header from './Header.vue';
import Footer from '../utils/Footer.vue';

const route = useRoute();
const showRouteHeader = computed(() => shouldShowRouteHeader(route.path));

const techs = ref({});
const isLoading = ref(true);
const loadError = ref('');

onMounted(async () => {
    try {
        const catalog = await getCatalogByName('tecnologies_icons');
        techs.value = catalog.data || {};
        if (!catalog || catalog.length === 0) {
            loadError.value = 'No hay tecnologías disponibles.';
        }
    } catch (error) {
        loadError.value = 'Error al cargar las tecnologías.';
    } finally {
        isLoading.value = false;
    }
});

</script>

<template>
    <template v-if="showRouteHeader">
        <Background1 />
        <Header />
    </template>
    <div class="content">
        <div class="head-continer">
            <h1 class="title-text">Tecnologías Empleadas</h1>
            <p class="description">
                En Kinasis, utilizamos una amplia gama de tecnologías y herramientas para ofrecer soluciones innovadoras y eficientes a nuestros clientes. 
                Nuestra experiencia abarca desde el desarrollo web, el análisis de datos, aplicativos de escritorio, sitios Ecommerce, entre otros.
            </p>
            <p class="description">
                Nuestra meta es mantenernos a la vanguardia de las tendencias tecnológicas 
                para garantizar que nuestros clientes reciban las mejores soluciones adaptadas a sus necesidades específicas.
            </p>
        </div>
        <div class="tecnologies-card">
            <p v-if="isLoading" class="loading-text">Cargando tecnologías...</p>
            <p v-else-if="loadError" class="error-text">{{ loadError }}</p>
            <div v-else class="techs-container">
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de Desarrollo web</h2>
                    <div class="techs-grid">
                        <img :src="techs['react']" alt="React" class="tech-icon" />
                        <img :src="techs['vue']" alt="Vue.js" class="tech-icon" />
                        <img :src="techs['astro']" alt="Astro" class="tech-icon" />
                        <img :src="techs['html']" alt="hTML" class="tech-icon" />
                        <img :src="techs['css']" alt="CSS" class="tech-icon" />
                        <img :src="techs['javascript']" alt="JavaScript" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de Procesamiento</h2>
                    <div class="techs-grid">
                        <img :src="techs['python']" alt="Python" class="tech-icon" />
                        <img :src="techs['node']" alt="NodeJS" class="tech-icon" />
                        <img :src="techs['csharp']" alt="C#" class="tech-icon" />
                        <img :src="techs['cpp']" alt="C++" class="tech-icon" />
                        <img :src="techs['java']" alt="Java" class="tech-icon" />
                        <img :src="techs['php']" alt="PHP" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de Almacenamiento</h2>
                        <img :src="techs['mongo']" alt="MongoDB" class="tech-icon" />
                        <img :src="techs['cassandra']" alt="CassandraDB" class="tech-icon" />
                        <img :src="techs['dynamo']" alt="dynamoDB" class="tech-icon" />
                        <img :src="techs['mysql']" alt="MySQL" class="tech-icon" />
                        <img :src="techs['postgres']" alt="PostgreSQL" class="tech-icon" />
                        <img :src="techs['sqlserver']" alt="SQLserver" class="tech-icon" />
                    <div class="techs-grid">
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de la Nube</h2>
                    <div class="techs-grid">
                        <img :src="techs['aws']" alt="AWS" class="tech-icon" />
                        <img :src="techs['azure']" alt="Azure" class="tech-icon" />
                        <img :src="techs['gcp']" alt="Google Cloud Platform" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias DevSecOps</h2>
                    <div class="techs-grid">
                        <img :src="techs['docker']" alt="Docker" class="tech-icon" />
                        <img :src="techs['kubernetes']" alt="Kubernetes" class="tech-icon" />
                        <img :src="techs['github']" alt="GitHub Actions" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de Diseño</h2>
                    <div class="techs-grid">
                        <img :src="techs['figma']" alt="Figma" class="tech-icon" />
                        <img :src="techs['adobe']" alt="Adobe Suite" class="tech-icon" />
                        <img :src="techs['canva']" alt="Canva" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de Testeo</h2>
                    <div class="techs-grid">
                        <img :src="techs['typescript']" alt="TS" class="tech-icon" />
                        <img :src="techs['unittest']" alt="UnitTest" class="tech-icon" />
                        <img :src="techs['selenium']" alt="Selenium" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Tecnologias de Desarrollo</h2>
                    <div class="techs-grid">
                        <img :src="techs['github']" alt="GitHub Actions" class="tech-icon" />
                        <img :src="techs['atlassian']" alt="Confluence" class="tech-icon" />
                        <img :src="techs['slack']" alt="slack" class="tech-icon" />                       
                    </div>
                </div>
            </div>
        </div>
        <div class="goals-container">
            <Separator2 />
            <h2 class="goals-title">En Proceso.</h2>
            <p class="goals-description">
                Buscamos especializarnos en nuevos desarrollos y tecnologías, como el desarrollo de 
                aplicaciones móviles, inteligencia artificial, machine learning, entre otros.
            </p>
            <p v-if="isLoading" class="loading-text">Cargando tecnologías...</p>
            <p v-else-if="loadError" class="error-text">{{ loadError }}</p>
            <div v-else class="techs-container">
                <div class="techs-card-future">
                    <h2 class="tittle-tech">Nos seguimos preparando</h2>
                    <div class="techs-grid">
                        <img :src="techs['flutter']" alt="Flutter" class="tech-icon" />
                        <img :src="techs['kotlin']" alt="Kotlin" class="tech-icon" />
                        <img :src="techs['react']" alt="React Native" class="tech-icon" />
                        <img :src="techs['go']" alt="GO" class="tech-icon" />
                        <img :src="techs['rust']" alt="Rust" class="tech-icon" />
                        <img :src="techs['pytorch']" alt="Rust" class="tech-icon" />
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.head-continer {
    text-align: center;
    margin-bottom: 3rem;
}
.title-text {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    transition: font-size 0.3s ease;
}
.description {
    text-align: justify;
    font-size: 1.2rem;
    color: var(--text-color);
}
.title-text:hover{
    font-size: 2.6rem;
    transition: font-size 0.3s ease;
}
.title-text:active{
    font-size: 2.4rem;
    transition: font-size 0.3s ease;
}

.loading-text,
.error-text {
    font-size: 1.1rem;
    margin-top: 2rem;
    text-align: center;
    color: var(--text-color);
}
.error-text {
    color: #ff6b6b;
}
.techs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}
.techs-card {
    background: var(--card-background);
    border-radius: 8px;
    padding: 1.5rem;
    width: 350px;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    align-items: center;
    text-align: center;
}
.techs-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px var(--shadow-color);
}
.tittle-tech {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}
.tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}
.tech-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
    transition: transform 0.3s ease, filter 0.3s ease;
    margin: 10px;
}
.tech-icon:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
}
.goals-container {
    text-align: center;
}
.goals-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}
.goals-description {
    font-size: 1.5rem;
    color: var(--text-color);
    max-width: 800px;
    margin: 0 auto;
    text-align: justify;
    margin-bottom: 10px;
}
.techs-card-future {
    background: var(--card-background);
    border-radius: 8px;
    padding: 1.5rem;
    width: 1200px;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    align-items: center;
    text-align: center;
}
.techs-card-future:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px var(--shadow-color);
}
</style>