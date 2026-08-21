<script setup>
const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 8.5}%`,
  delay: `${i * 0.35}s`,
  duration: `${4 + (i % 3)}s`,
}));

const leftOrbits = [
  { size: 74, top: '50%', left: '18%', delay: '0s' },
  { size: 46, top: '34%', left: '30%', delay: '0.8s' },
  { size: 38, top: '66%', left: '28%', delay: '1.2s' },
];

const rightOrbits = [
  { size: 74, top: '50%', right: '18%', delay: '0.4s' },
  { size: 46, top: '34%', right: '30%', delay: '1s' },
  { size: 38, top: '66%', right: '28%', delay: '1.4s' },
];
</script>

<template>
  <section class="orb-separator" aria-hidden="true">
    <div class="line"></div>

    <!-- LADO IZQUIERDO -->
    <div class="side-cluster left">
      <div
        v-for="(orbit, index) in leftOrbits"
        :key="`left-${index}`"
        class="mini-orbit"
        :style="{
          width: `${orbit.size}px`,
          height: `${orbit.size}px`,
          top: orbit.top,
          left: orbit.left,
          animationDelay: orbit.delay
        }"
      >
        <span class="mini-ring"></span>
        <span class="mini-core"></span>
        <span class="mini-dot orbit-dot"></span>
      </div>
    </div>

    <!-- CENTRO -->
    <div class="centerpiece">
      <div class="glow"></div>
      <div class="core"></div>
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>

      <span
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.left,
          animationDelay: particle.delay,
          animationDuration: particle.duration
        }"
      />
    </div>

    <!-- LADO DERECHO -->
    <div class="side-cluster right">
      <div
        v-for="(orbit, index) in rightOrbits"
        :key="`right-${index}`"
        class="mini-orbit"
        :style="{
          width: `${orbit.size}px`,
          height: `${orbit.size}px`,
          top: orbit.top,
          right: orbit.right,
          animationDelay: orbit.delay
        }"
      >
        <span class="mini-ring"></span>
        <span class="mini-core"></span>
        <span class="mini-dot orbit-dot"></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.orb-separator {
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--primary-color) 12%, transparent) 15%,
    color-mix(in srgb, var(--primary-color) 32%, transparent) 50%,
    color-mix(in srgb, var(--primary-color) 12%, transparent) 85%,
    transparent 100%
  );
}

/* CENTRO */
.centerpiece {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.glow {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--primary-color) 30%, transparent) 0%,
    color-mix(in srgb, var(--primary-color) 12%, transparent) 35%,
    transparent 72%
  );
  filter: blur(18px);
  animation: breathe 4s ease-in-out infinite;
}

.core {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: var(--primary-color);
  box-shadow:
    0 0 12px color-mix(in srgb, var(--primary-color) 60%, transparent),
    0 0 24px color-mix(in srgb, var(--primary-color) 40%, transparent),
    0 0 42px color-mix(in srgb, var(--primary-color) 28%, transparent);
  z-index: 3;
  animation: pulse 2.4s ease-in-out infinite;
}

.ring {
  position: absolute;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 22%, transparent);
}

.ring-1 {
  width: 64px;
  height: 64px;
  animation: rotate 12s linear infinite;
}

.ring-2 {
  width: 96px;
  height: 96px;
  border-style: dashed;
  border-color: color-mix(in srgb, var(--primary-color) 18%, transparent);
  animation: rotateReverse 18s linear infinite;
}

.ring-3 {
  width: 132px;
  height: 132px;
  border-color: color-mix(in srgb, var(--primary-color) 12%, transparent);
  animation: floatRing 5s ease-in-out infinite;
}

.particle {
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 78%, white 22%);
  box-shadow: 0 0 10px color-mix(in srgb, var(--primary-color) 35%, transparent);
  opacity: 0;
  transform: translateY(0) scale(0.7);
  animation-name: drift;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* LADOS */
.side-cluster {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.mini-orbit {
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

.mini-ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 18%, transparent);
  animation: rotate 14s linear infinite;
}

.mini-core {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 70%, white 30%);
  box-shadow:
    0 0 10px color-mix(in srgb, var(--primary-color) 35%, transparent),
    0 0 18px color-mix(in srgb, var(--primary-color) 18%, transparent);
  animation: miniPulse 2.8s ease-in-out infinite;
}

.orbit-dot {
  position: absolute;
  top: -2px;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--primary-color);
  transform-origin: 50% calc(50% + 999px);
  animation: orbitAround 6s linear infinite;
  box-shadow: 0 0 8px color-mix(in srgb, var(--primary-color) 35%, transparent);
}

/* ANIMACIONES */
@keyframes pulse {
  0%, 100% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(0.92);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateReverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes floatRing {
  0%, 100% {
    transform: scale(1) translateY(0);
    opacity: 0.65;
  }
  50% {
    transform: scale(1.04) translateY(-2px);
    opacity: 1;
  }
}

@keyframes drift {
  0% {
    opacity: 0;
    transform: translateY(0px) scale(0.6);
  }
  20% {
    opacity: 1;
  }
  50% {
    transform: translateY(-18px) scale(1);
  }
  80% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: translateY(-34px) scale(0.6);
  }
}

@keyframes miniPulse {
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes orbitAround {
  from {
    transform: rotate(0deg) translateY(calc(var(--orbit-size, 40px) / 2 - 3px));
  }
  to {
    transform: rotate(360deg) translateY(calc(var(--orbit-size, 40px) / 2 - 3px));
  }
}

/* responsive */
@media (max-width: 768px) {
  .orb-separator {
    height: 120px;
  }

  .centerpiece {
    width: 130px;
    height: 130px;
  }

  .ring-1 {
    width: 48px;
    height: 48px;
  }

  .ring-2 {
    width: 72px;
    height: 72px;
  }

  .ring-3 {
    width: 98px;
    height: 98px;
  }

  .core {
    width: 14px;
    height: 14px;
  }

  .particle {
    width: 5px;
    height: 5px;
  }

  .mini-orbit:nth-child(2),
  .mini-orbit:nth-child(3) {
    opacity: 0.55;
    transform: translateY(-50%) scale(0.85);
  }
}
</style>