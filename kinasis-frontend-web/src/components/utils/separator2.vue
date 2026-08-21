<script setup>
const dots = Array.from({ length: 9 });
</script>

<template>
  <section class="separator" aria-hidden="true">
    <div class="separator-line left"></div>

    <div class="separator-center">
      <span
        v-for="(_, index) in dots"
        :key="index"
        class="dot"
        :style="{ animationDelay: `${index * 0.12}s` }"
      ></span>
    </div>

    <div class="separator-line right"></div>
  </section>
</template>

<style scoped>
.separator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 2.5rem 1rem;
  overflow: hidden;
}

.separator-line {
  flex: 1;
  height: 1px;
  position: relative;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.28),
    rgba(255, 255, 255, 0.08),
    transparent
  );
}

.separator-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.02);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 0 20px rgba(255, 255, 255, 0.03);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--primary-color);
  opacity: 0.25;
  transform: scale(0.8);
  animation: pulseWave 1.8s ease-in-out infinite;
  box-shadow: 0 0 10px color-mix(in srgb, var(--primary-color) 35%, transparent);
}

@keyframes pulseWave {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.75);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

@media (max-width: 768px) {
  .separator {
    gap: 0.8rem;
    padding: 2rem 0.75rem;
  }

  .separator-center {
    gap: 0.45rem;
    padding: 0.45rem 0.8rem;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}
</style>