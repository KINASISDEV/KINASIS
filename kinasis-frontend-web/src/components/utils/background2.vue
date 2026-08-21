<script setup>
import { onMounted, onUnmounted } from 'vue';

let observer = null;

const initParticles = () => {
  if (window.particlesJS) {
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary-color').trim();
    const secondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--secondary-color').trim();

    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }

    window.particlesJS('particles-js-2', {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 900
          }
        },
        color: {
          value: primaryColor
        },
        shape: {
          type: ['circle', 'edge', 'triangle'],
          stroke: {
            width: 2,
            color: primaryColor
          },
          polygon: {
            nb_sides: 6
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.15,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 3,
            size_min: 1,
            sync: false
          }
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'top',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 800,
            rotateY: 1600
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: ['grab', 'bubble']
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.6
            }
          },
          bubble: {
            distance: 250,
            size: 8,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 3
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  } else {
    console.error('particlesJS no está disponible');
  }
};

onMounted(() => {
  initParticles();

  // Observar cambios en el tema
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        initParticles();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
});
</script>

<template>
  <div class="background-wrapper">
    <div class="gradient-layer"></div>
    <div class="animated-gradient"></div>
    <div id="particles-js-2"></div>
    <div class="glow-effects">
      <div class="glow-orb glow-1"></div>
      <div class="glow-orb glow-2"></div>
      <div class="glow-orb glow-3"></div>
    </div>
  </div>
</template>

<style scoped>
.background-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.gradient-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--secondary-color);
  z-index: 0;
}

.animated-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb, 138, 43, 226), 0.08) 0%, transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(var(--primary-rgb, 138, 43, 226), 0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb, 138, 43, 226), 0.04) 0%, transparent 60%);
  animation: gradientPulse 15s ease-in-out infinite;
  z-index: 1;
}

@keyframes gradientPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

#particles-js-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.glow-effects {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: floatOrb 20s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--primary-color), transparent);
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.glow-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--primary-color), transparent);
  bottom: 15%;
  right: 20%;
  animation-delay: 7s;
}

.glow-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--primary-color), transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 14s;
}

@keyframes floatOrb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translate(30px, -40px) scale(1.1);
    opacity: 0.5;
  }
  66% {
    transform: translate(-40px, 30px) scale(0.9);
    opacity: 0.4;
  }
}

.background-wrapper {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
