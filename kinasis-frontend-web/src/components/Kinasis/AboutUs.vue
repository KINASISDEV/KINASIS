<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { shouldShowRouteHeader } from '../utils/calls.js';
import Background1 from '../utils/background1.vue';
import Separator1 from '../utils/separator1.vue';
import Header from './Header.vue';
import Footer from '../utils/Footer.vue';

const route = useRoute();
const showRouteHeader = computed(() => shouldShowRouteHeader(route.path));

</script>

<template>
    <template v-if="showRouteHeader">
        <Background1 />
        <Header />
    </template>
    <div class="content">
        <div class="tittle-head">
            <div class="logo_kinasis">
                <img src="/general_assets/logo_white.png" class="logo-light"/>
                <img src="/general_assets/logo_dark.png" class="logo-dark"/>
            </div>
            <h1>KINASIS</h1>
        </div>
        <div class="slogan-box">
            <h2>Conectamos tu visión con la tecnología.</h2>
        </div>
        <div class="aboutus-box">
            <h2>¿Quiénes somos?</h2>
            <h3> En <a class="specific-text">Kinasis</a> somos un equipo de ingenieros enfocados en transformar ideas en soluciones tecnológicas reales. 
                Diseñamos software, sistemas y plataformas digitales mediante un enfoque metódico que prioriza la calidad, 
                la comunicación y la entrega de resultados alineados a los objetivos de cada cliente.
            </h3>
        </div>
        <div class="list-box">
            <ul>
                <li>
                    <div class="content-box">
                        <h2>Mision</h2>
                        <p>
                            Nuestra misión es ser el socio tecnológico de confianza para empresas y emprendedores, brindando soluciones digitales 
                            que no solo cumplan, sino que superen sus expectativas y contribuyan al éxito de sus proyectos.
                        </p>
                    </div>
                </li>
                <li>
                    <div class="content-box">
                        <h2>Vision</h2>
                        <p>
                           Ser referentes en el desarrollo de software mediante el ámbito tecnológico, reconocidos por la calidad de 
                           nuestro trabajo y por potenciar el crecimiento de nuestros clientes posicionándonos como una empresa emergente.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <Separator1 />
        <div class="values-box">
            <h1 class="tittle-value">Nuestros Valores</h1>
            <div class="valueslist-box">
                <ul>
                    <li>
                        <div class="value-box">
                            <h2>Calidad</h2>
                            <p>
                                Entregamos software confiable y alineado a los objetivos de cada cliente.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="value-box">
                            <h2>Adaptabilidad</h2>
                            <p>
                                Evolucionamos frente a nuevas tecnologías y necesidades del mercado.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="value-box">
                            <h2>Colaboracion</h2>
                            <p>
                                Construimos progreso trabajando de la mano con nuestros clientes y equipos.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="value-box">
                            <h2>Innovacion</h2>
                            <p>
                                Transformamos ideas en soluciones reales mediante creatividad y tecnología.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="value-box">
                            <h2>Rigor</h2>
                            <p>
                                Aplicamos disciplina y procesos claros para garantizar resultados consistentes.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="value-box">
                            <h2>Sostenibilidad</h2>
                            <p>
                                Nuestras soluciones están pensadas para ser autosuficientes y evolucionar.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="goals-content">
             <h1 class="tittle-value">Nuestras Metas</h1>
            <div class="metas-board">
                <article class="metas-card metas-card-short">
                    <div class="metas-chip">Corto Plazo</div>
                    <h2 class="metas-title">Consolidacion.</h2>
                    <p class="metas-text">
                        Ser reconocidos por entregar soluciones personalizadas y de alta calidad en aplicaciones web, móviles y sistemas empresariales.
                        Consolidarnos como un equipo experto en desarrollo de software.
                    </p>
                </article>

                <article class="metas-card metas-card-medium">
                    <div class="metas-chip">Evolucion.</div>
                    <h2 class="metas-title">Automatización e IA aplicada.</h2>
                    <p class="metas-text">
                        Integrar inteligencia artificial y automatización avanzada en nuestros proyectos.
                        Desarrollar sistemas inteligentes que optimicen procesos, reduzcan costos y mejoren la toma de decisiones mediante análisis predictivo.
                    </p>
                </article>

                <article class="metas-card metas-card-long">
                    <div class="metas-chip">Largo Plazo</div>
                    <h2 class="metas-title">Escala y reconocimiento.</h2>
                    <p class="metas-text">
                        Posicionarnos como una empresa tecnológica de referencia a nivel Nacional.
                        Expandir nuestra presencia en el mercado, ampliando nuestro portafolio de servicios para atender a una base de clientes cada vez más diversa.
                    </p>
                </article>
            </div>
        </div>
    </div>
    <template v-if="showRouteHeader">
        <Footer />
    </template>
</template>

<style scoped>

.content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    min-height: calc(100vh - 60px);
    padding-top: 28px;
    background: transparent;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
}

.tittle-head {
    --brand-size: clamp(72px, 10vw, 120px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    background: transparent;
}

.logo_kinasis img {
    width: var(--brand-size);
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
    margin: 0;
    font-size: var(--brand-size);
    line-height: 1;
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

.slogan-box {
    margin-top: 5px;
}

.specific-text {
    color: var(--primary-color);
    font-weight: bold;
}

.aboutus-box {
    border-radius: 35px;
    max-width: 800px;
    margin-top: 40px;
    padding: 10px 20px;
    text-align: justify;
    transition: all 0.2s ease;
}

.aboutus-box:hover{
    border-radius: 35px;
    transform: translateY(-5px);
    box-shadow: 
        0 10px 28px -18px var(--shadow-color),
        0 0 14px var(--shadow-color);
    transition: all 0.2s ease;
}

.aboutus-box h2 {
    font-size: 20px;
    margin-bottom: 20px;
    transition: all 0.2s ease;
}

.aboutus-box h2:hover {
    font-size: 21px;
    color: var(--primary-color);
    text-shadow: 
        0 0 2px var(--primary-color),
        0 0 5px var(--secondary-color);
    transition: all 0.2s ease;
}

.aboutus-box h3 {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-color);
    text-shadow: 
        0 0 3px var(--text-color),
        0 0 5px var(--shadow-color);
}

.content-box {
    border-radius: 35px;
    max-width: 400px;
    height: 200px;
    margin-top: 40px;
    padding: 10px 20px;
    text-align: justify;
    transition: all 0.2s ease;
}

.content-box:hover{
    border-radius: 35px;
    transform: translateY(-5px);
    box-shadow: 
        0 10px 28px -18px var(--shadow-color),
        0 0 14px var(--shadow-color);
    transition: all 0.2s ease;
}

.content-box h2 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
    transition: all 0.2s ease;
}

.content-box h2:hover {
    font-size: 25px;
    color: var(--primary-color);
    text-shadow: 
        0 0 2px var(--primary-color),
        0 0 5px var(--secondary-color);
    transition: all 0.2s ease;
}

.content-box p {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-color);
    text-shadow: 
        0 0 3px var(--text-color),
        0 0 5px var(--shadow-color);
}

.list-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.list-box ul {
    display: flex;
    gap: 40px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.values-box {
    margin-top: 30px;
}

.tittle-value {
    font-size: 40px;
    margin: 0 auto 30px;
    transition: all 0.2s ease;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    padding: 10px 20px;
    border-radius: 35px;
    width: max-content;
    box-shadow: 0 5px var(--shadow-color);
}


.valueslist-box {
    display: flex;
    gap: 20px;
}

.valueslist-box ul {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.value-box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 35px;
    width: 200px;
    height: 200px;
    padding: 10px 20px;
    text-align: center;
    overflow: hidden;
    transition: all 0.2s ease;
}

.value-box:hover {
    background: var(--primary-color);
}

.value-box h2 {
    margin: 0;
    font-size: 24px;
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.value-box p {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 50%;
    margin: 0;
    font-size: 18px;
    line-height: 1.4;
    color: var(--text-color);
    text-align: center;
    opacity: 0;
    transform: translateY(12px);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.value-box:hover h2,
.value-box:hover p {
    color: var(--secondary-color);
}

.value-box:hover h2 {
    opacity: 0;
    transform: translateY(-12px);
}

.value-box:hover p {
    opacity: 1;
    transform: translateY(-50%);
}

.goals-content {
    margin-top: 40px;
}

.metas-board {
    width: min(1100px, 100%);
    margin: 0 auto;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    padding: 8px 8px 4px;
}

.metas-card {
    position: relative;
    overflow: hidden;
    padding: 22px 20px;
    border-radius: 28px;
    text-align: left;
    background:
        linear-gradient(160deg,
            color-mix(in srgb, var(--secondary-color) 92%, transparent) 0%,
            color-mix(in srgb, var(--secondary-color) 84%, var(--primary-color)) 100%);
    border: 1px solid color-mix(in srgb, var(--primary-color) 28%, transparent);
    box-shadow:
        0 14px 30px -22px var(--shadow-color),
        inset 0 1px 0 color-mix(in srgb, var(--primary-color) 22%, transparent);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.metas-card::after {
    content: '';
    position: absolute;
    right: -20px;
    top: -22px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--primary-color) 22%, transparent) 0%, transparent 70%);
    pointer-events: none;
}

.metas-card:hover {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--primary-color) 52%, transparent);
    box-shadow:
        0 18px 34px -20px var(--shadow-color),
        0 0 0 1px color-mix(in srgb, var(--primary-color) 22%, transparent);
}

.metas-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: color-mix(in srgb, var(--primary-color) 16%, transparent);
    color: var(--primary-color);
}

.metas-title {
    margin: 0 0 10px;
    font-size: clamp(1.1rem, 1.7vw, 1.35rem);
    line-height: 1.25;
    color: var(--text-color);
}

.metas-text {
    text-align: justify;
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.55;
    color: var(--text-color);
    opacity: 0.9;
}

.metas-card-short {
    border-top: 4px solid color-mix(in srgb, var(--primary-color) 40%, transparent);
}

.metas-card-medium {
    border-top: 4px solid color-mix(in srgb, var(--primary-color) 55%, transparent);
}

.metas-card-long {
    border-top: 4px solid color-mix(in srgb, var(--primary-color) 70%, transparent);
}

@media (max-width: 980px) {
    .metas-board {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .metas-card {
        text-align: center;
    }
}
</style>