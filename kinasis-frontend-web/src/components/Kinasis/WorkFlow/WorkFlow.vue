<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { shouldShowRouteHeader } from '../../utils/calls.js';
import Background1 from '../../utils/background1.vue';
import Separator2 from '../../utils/separator2.vue';
import Separator3 from '../../utils/Separator3.vue';
import Header from '../Header.vue';
import Footer from '../../utils/Footer.vue';
import { steps, canvasRef, svgRef, inView, setupWorkflow, cleanupWorkflow } from './workflow.js';

const route = useRoute();
const showRouteHeader = computed(() => shouldShowRouteHeader(route.path));
onMounted(setupWorkflow);
onUnmounted(cleanupWorkflow);
</script>

<template>
  <div class="fullpage-root">
    <template v-if="showRouteHeader">
      <Background1 />
      <Header />
      <section class="section workflow-section" data-step="hero">
        <div class="container split">
          <div class="left up-30">
            <h1 class="title">Nuestro proceso</h1>
            <p class="subtitle">combina estrategia y tecnología en cada proyecto<br>demostrando resultados con Kinasis.</p>
          </div>
          <div class="right">
              <img src="/general_assets/logo_white.png" class="plain-img-light"/>
              <img src="/general_assets/logo_dark.png" class="plain-img-dark"/>
          </div>
        </div>
      </section>
      <Separator2 />  
    </template>

    <section class="section workflow-section" data-step="steps">
      <div class="container center">
        <h2 class="title mb-3">¿Cómo realizamos un proyecto?</h2>
        <p class="lead justify mb-4">
          Desarrollamos soluciones con un enfoque incremental, ideal para proyectos grandes o en evolución. Dividimos el trabajo en microentregas con tiempos definidos.
        </p>
        <p class="subtitle justify bold mb-5">Nuestro proceso Incremental</p>

        <div class="stair-canvas" aria-hidden="true">
          <div class="stair" :class="{ animate: inView.steps }">
            <div v-for="(item, idx) in steps" :key="idx" class="box" v-html="item.text"></div>
          </div>
        </div>
      </div>
    </section>

    <Separator3 />
    <section class="section workflow-section" data-step="flow">
      <div class="container center">
        <h2 class="title mb-3">Flujo de Desarrollo</h2>
        <p class="lead justify mb-5">
          Nuestro flujo de trabajo se basa en Scrum, con iteraciones cortas y comunicación constante. Este enfoque nos permite entregar valor temprano, ajustar prioridades y mantener la calidad y transparencia en todo el proceso. Con ambientes definidos garantizamos calidad en cada entrega.
        </p>
        <div class="flow-canvas" ref="canvasRef" :class="{ animate: inView.flow }">
          <div class="flow-box prod">Ambiente de Producción (PROD)</div>
          <div class="flow-box mj">Mejora continua</div>
          <div class="flow-box dev">Ambiente de Desarrollo (DEV)</div>
          <div class="flow-box qa">Ambiente de pruebas (QA)</div>
          <svg class="flow-arrows" ref="svgRef" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" />
              </marker>
            </defs>
          </svg>
        </div>
        <p class="note justify mt-5">
          Un ciclo que inicia en construcción y prueba de funcionalidades, continúa la validación previa a entrega y culmina en un entorno de producción estable. Este proceso se complementa con nuestra filosofía de mejora continua, que nos permite corregir errores y optimizar resultados de manera constante.
        </p>
      </div>
    </section>

    <Separator3 />
    <section class="section workflow-section" data-step="patterns">
      <div class="container center">
        <h2 class="title mb-3">Arquitecturas de software</h2>
        <p class="lead justify mb-5">
          Diseñamos arquitecturas de software sólidas, escalables y adaptadas a las necesidades de cada proyecto. Nuestro enfoque modular garantiza mantenibilidad y flexibilidad, asegurando que cada solución se alinee con los objetivos del negocio.
        </p>
        <div class="subtitle-left mb-3">
          <h3 class="subtitle big">Patrones</h3>
        </div>
        <div class="icons-row" :class="{ animate: inView.patterns }">
          <div v-for="icon in ['⚙️','🧩','🔒','☁️','📦']" :key="icon" class="icon">{{ icon }}</div>
        </div>
      </div>
    </section>
    <template v-if="showRouteHeader">
      <Footer />
    </template>
  </div>
</template>

<style src="./workflow.css" scoped></style>
