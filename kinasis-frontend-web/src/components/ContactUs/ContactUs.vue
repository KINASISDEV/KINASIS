<script setup>
import { useContact } from './ContactUs.js'
import Header from './Header.vue';
import background1 from '../utils/background1.vue';
import Footer from '../utils/Footer.vue';

const {
    form,
    errors,
    sending,
    tempStatus,
    tempStatusClass,
    showModal,
    modalType,
    modalTitle,
    modalMessage,
    buttonText,
    sanitizeNameInput,
    sanitizePhoneInput,
    validateEmailField,
    validateMessageField,
    handleSubmit,
    closeModal,
    validateAllFields
} = useContact()
</script>

<template>
    <background1 />
    <Header />
    <main class="contact-root">
        <section class="Banner banner-contact" aria-labelledby="contact-title">
            <h1 id="contact-title">Contacto</h1>
            <h2>¿Tienes una idea? Cuéntanos tu proyecto y te ayudaremos a hacerlo realidad</h2>
        </section>

        <section class="contact-container" role="region" aria-label="Formulario de contacto">
            <div class="contact-content">
                <aside class="contact-info" aria-label="Información de contacto">
                    <div class="info-box" tabindex="0">
                        <div class="info-icon">📧</div>
                        <div>
                            <h4>Email</h4>
                            <p class="muted">kinaisisdev@outlook.com</p>
                        </div>
                    </div>

                    <div class="info-box" tabindex="0">
                        <div class="info-icon">📞</div>
                        <div>
                            <h4>Teléfono</h4>
                            <p class="muted phone-number">+52 56 2730 8641</p>
                        </div>
                    </div>

                    <div class="info-box" tabindex="0">
                        <div class="info-icon">📍</div>
                        <div>
                            <h4>Ubicación</h4>
                            <p class="muted">CDMX, MEXICO</p>
                        </div>
                    </div>
                </aside>

                <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
                    <h3>Cuéntanos tu idea</h3>

                    <div class="form-grid">
                        <div>
                            <input v-model="form.name" required placeholder="Nombre *" aria-label="Nombre"
                                maxlength="40" title="Máximo 40 caracteres" @input="sanitizeNameInput"
                                :class="{ 'input-error': errors.name }" />
                            <p class="field-error" v-if="errors.name">{{ errors.name }}</p>
                        </div>

                        <div>
                            <input v-model="form.email" type="email" required placeholder="Email *" aria-label="Email"
                                @input="validateEmailField" maxlength="30" title="Máximo 30 caracteres"
                                :class="{ 'input-error': errors.email }" />
                            <p class="field-error" v-if="errors.email">{{ errors.email }}</p>
                        </div>

                        <div>
                            <input v-model="form.phone" type="tel" inputmode="numeric" placeholder="Teléfono"
                                aria-label="Teléfono" maxlength="15" title="Sólo números, máximo 15 dígitos"
                                @input="sanitizePhoneInput" :class="{ 'input-error': errors.phone }" />
                            <p class="field-error" v-if="errors.phone">{{ errors.phone }}</p>
                        </div>

                        <div>
                            <input v-model="form.company" placeholder="Empresa" aria-label="Empresa" maxlength="60"
                                title="Máximo 60 caracteres" />
                        </div>
                    </div>

                    <textarea v-model="form.message" rows="6" required
                        placeholder="Describe tu idea o proyecto. ¿Qué problema quieres resolver? ¿Cuáles son tus objetivos?"
                        aria-label="Mensaje" @input="validateMessageField"
                        :class="{ 'input-error': errors.message }"></textarea>
                    <p class="field-error" v-if="errors.message">{{ errors.message }}</p>

                    <div class="form-actions">
                        <button type="submit" class="send-btn" :disabled="sending" :class="{ sending }"
                            :aria-busy="sending">
                            {{ buttonText }}
                        </button>
                    </div>
                    <p class="form-note" v-if="tempStatus" role="status" :class="tempStatusClass">{{ tempStatus }}</p>
                </form>
            </div>
        </section>

        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-icon" :class="modalType">
                    <span v-if="modalType === 'success'">✅</span>
                    <span v-else>❌</span>
                </div>
                <h4>{{ modalTitle }}</h4>
                <p>{{ modalMessage }}</p>
                <button @click="closeModal" class="modal-btn">Cerrar</button>
            </div>
        </div>
    </main>
    <Footer />
</template>

<style scoped>
.banner-contact {
    position: relative;
    min-height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 3.375rem 2rem;
    overflow: hidden;
    margin: 2rem auto 6rem auto;
    max-width: 90%;
    border-radius: 60px 40px 80px 30px;
    background: linear-gradient(-45deg,
            var(--primary-color),
            var(--primary-color),
            var(--primary-color),
            var(--primary-color));
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite, morphShape 12s ease-in-out infinite;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: none;
    box-shadow:
        0 8px 32px color-mix(in srgb, var(--primary-color) 30%, transparent),
        0 16px 64px color-mix(in srgb, var(--primary-color) 20%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    transform: perspective(1000px) rotateX(2deg);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dark .banner-contact {
    background: linear-gradient(-45deg,
            var(--primary-color),
            var(--primary-color),
            var(--primary-color),
            var(--primary-color));
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite, morphShape 12s ease-in-out infinite;
    border: none;
    box-shadow:
        0 8px 32px color-mix(in srgb, var(--primary-color) 30%, transparent),
        0 16px 64px color-mix(in srgb, var(--primary-color) 20%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.banner-contact::before {
    content: "";
    position: absolute;
    top: -25%;
    left: -20%;
    width: 140%;
    height: 140%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.14), transparent 55%);
    opacity: 0.45;
    filter: blur(12px);
    transform-origin: center;
    animation: liquidFloat 12s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
    border-radius: inherit;
}

.banner-contact::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.18) 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
        radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.08) 3px, transparent 3px),
        radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.10) 1.5px, transparent 1.5px);
    background-size: 80px 80px, 40px 40px, 120px 120px, 60px 60px;
    pointer-events: none;
    z-index: -1;
    border-radius: inherit;
}

.banner-contact h1 {
    font-family: 'Jura', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    color: white;
    text-shadow:
        0 4px 8px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(255, 255, 255, 0.3),
        0 0 40px rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
    line-height: 1.2;
    animation: fadeInUp 1s ease-out, textGlow 3s ease-in-out infinite alternate;
    user-select: none;
    position: relative;
    z-index: 2;
}

.dark-mode .banner-contact h1 {
    color: black;
    text-shadow:
        0 4px 8px rgba(255, 255, 255, 0.3),
        0 0 20px rgba(0, 0, 0, 0.2),
        0 0 40px rgba(0, 0, 0, 0.1);
}

.banner-contact h2 {
    font-family: 'Roboto Mono', monospace;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin: 0;
    line-height: 1.4;
    animation: fadeInUp 1s ease-out 0.3s both, subtleFloat 4s ease-in-out infinite;
    position: relative;
    z-index: 2;
}

.dark-mode .banner-contact h2 {
    color: black;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);
}

.contact-container {
    width: min(1100px, 94%);
    margin: 0 auto 4rem auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-content {
    display: grid;
    grid-template-columns: 0.8fr 1.6fr;
    gap: 2rem;
    align-items: start;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.info-box {
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: 20px;
    padding: 1.5rem;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.02));
    border: 1px solid color-mix(in srgb, var(--primary-color) 12%, transparent);
    backdrop-filter: blur(10px) saturate(120%);
    -webkit-backdrop-filter: blur(10px) saturate(120%);
    box-shadow: 0 8px 30px color-mix(in srgb, var(--primary-color) 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    transition: transform .35s ease, box-shadow .35s ease, background .35s ease, border-color .35s ease;
    cursor: default;
    position: relative;
    z-index: 1;
}

.info-box:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px color-mix(in srgb, var(--primary-color) 18%, transparent), inset 0 2px 6px rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border-color: color-mix(in srgb, var(--primary-color) 22%, transparent);
}

.info-icon {
    min-width: 52px;
    min-height: 52px;
    border-radius: 100%;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    background: color-mix(in srgb, var(--primary-color) 6%, transparent);
    color: var(--primary-color);
    transition: background .25s ease, color .25s ease, transform .25s ease;
}

.dark .info-icon {
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
    color: var(--primary-color);
}

.info-box h4 {
    margin: 0;
    font-family: 'Jura', sans-serif;
    color: var(--font-color);
    font-size: 1rem;
}

.dark .info-box {
    background: linear-gradient(180deg,
            color-mix(in srgb, var(--primary-color) 6%, transparent),
            color-mix(in srgb, var(--primary-color) 2%, transparent));
    border: 1px solid color-mix(in srgb, var(--primary-color) 12%, transparent);
    box-shadow: 0 8px 30px color-mix(in srgb, var(--primary-color) 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.dark .info-box h4 {
    color: var(--font-color);
}

.dark .info-box:hover {
    box-shadow: 0 18px 40px color-mix(in srgb, var(--primary-color) 18%, transparent), inset 0 2px 6px rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color) 2%, transparent), color-mix(in srgb, var(--primary-color) 1%, transparent));
    border-color: color-mix(in srgb, var(--primary-color) 22%, transparent);
}

.info-box p.muted {
    margin: 0;
    font-family: 'Roboto Mono', monospace;
    color: var(--font-color);
    font-size: 0.95rem;
}

.info-box p.muted.phone-number {
    letter-spacing: 0.14em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}

.dark .info-box p.muted {
    color: var(--font-color);
}

.contact-form {
    border-radius: 24px;
    padding: 1.6rem;
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.03));
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(14px) saturate(120%);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.dark .contact-form input,
.dark .contact-form textarea {
    background: transparent;
    color: var(--font-color);
    border: 1px solid var(--primary-color);
}

.dark .contact-form input:focus,
.dark .contact-form textarea:focus {
    box-shadow: 0 6px 18px color-mix(in srgb, var(--primary-color) 18%, transparent);
    transform: translateY(-2px);
}

.contact-form h3 {
    margin: 0 0 0.4rem 0;
    font-family: 'Jura', sans-serif;
    color: var(--font-color);
}

.dark .contact-form h3 {
    color: var(--font-color);
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 0.9rem 1rem;
    border-radius: 12px;
    border: none;
    outline: none;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.95rem;
    background: transparent;
    color: var(--font-color);
    transition: box-shadow .25s ease, transform .25s ease, background .25s ease, border-color .25s ease;
    border: 1px solid color-mix(in srgb, var(--primary-color) 30%, transparent);
    box-shadow: 0 0 0 0.5px color-mix(in srgb, var(--primary-color) 15%, transparent);
    width: 100%;
    box-sizing: border-box;
}

.contact-form input.input-error,
.contact-form textarea.input-error {
    border-color: #dc3545;
    box-shadow: 0 6px 18px rgba(220, 53, 69, 0.12);
}

.field-error {
    color: #dc3545;
    font-size: 0.85rem;
    margin: 0.35rem 0 0 0;
}

.contact-form input:focus,
.contact-form textarea:focus {
    box-shadow: 0 6px 18px color-mix(in srgb, var(--primary-color) 18%, transparent);
    transform: translateY(-2px);
}

.contact-form textarea {
    grid-column: 1 / -1;
    resize: vertical;
    margin-top: 1.2rem;
}

.form-actions {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    margin-top: 0.4rem;
}

.send-btn {
    background: var(--primary-color);
    color: var(--font-color);
    border: none;
    border-radius: 12px;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.2rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 30px color-mix(in srgb, var(--primary-color) 18%, transparent);
    transition: transform .28s ease, box-shadow .28s ease, filter .28s ease;
}

.dark .send-btn {
    background: var(--primary-color);
    color: var(--font-color);
    box-shadow: 0 10px 30px color-mix(in srgb, var(--primary-color) 18%, transparent);
    border: none;
}

.send-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 48px color-mix(in srgb, var(--primary-color) 28%, transparent);
    filter: saturate(1.05);
}

.dark .send-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 48px color-mix(in srgb, var(--primary-color) 28%, transparent);
    filter: saturate(1.05);
}

.ghost-btn {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 0.7rem 0.9rem;
    border-radius: 10px;
    cursor: pointer;
}

.form-note {
    font-size: 0.9rem;
    color: var(--font-color);
    margin-top: 0.5rem;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    25% {
        background-position: 100% 50%;
    }

    50% {
        background-position: 100% 100%;
    }

    75% {
        background-position: 0% 100%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes liquidFloat {

    0%,
    100% {
        transform: translateY(0) rotate(0.001deg);
    }

    50% {
        transform: translateY(8px) rotate(0.001deg);
    }
}

.send-btn.sending {
    background: linear-gradient(135deg, #6c757d, #495057);
    cursor: not-allowed;
    opacity: 0.8;
    transform: scale(0.98);
}

.dark .send-btn.sending {
    background: linear-gradient(135deg, #6c757d, #495057);
}


.form-note.sending {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--primary-color) 30%, transparent);
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: 500;
}

.dark .form-note.sending {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--primary-color) 30%, transparent);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: modalFadeIn 0.3s ease-out;
}

.modal-content {
    background: var(--secondary-color);
    border-radius: 20px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    animation: modalSlideIn 0.3s ease-out;
    position: relative;
}

.dark .modal-content {
    background: var(--background-color);
    color: var(--font-color);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.modal-icon.success {
    color: #28a745;
}

.modal-icon.error {
    color: #dc3545;
}

.modal-content h4 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: inherit;
}

.modal-content p {
    margin: 0 0 1.5rem 0;
    color: var(--font-color);
    line-height: 1.5;
}

.dark .modal-content p {
    color: var(--font-color);
}

.modal-btn {
    background: var(--primary-color);
    color: var(--font-color);
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    min-width: 120px;
}

.dark .modal-btn {
    background: var(--primary-color);
    color: var(--font-color);
}

.modal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}


@keyframes modalFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes modalSlideIn {
    from {
        transform: translateY(-20px) scale(0.95);
        opacity: 0;
    }

    to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

@media (max-width: 900px) {
    .contact-content {
        grid-template-columns: 1fr;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .banner-contact {
        padding: 2rem 1.2rem;
        width: auto;
        margin: 1.2rem;
    }

    .modal-content {
        margin: 1rem;
        padding: 1.5rem;
    }
}
</style>