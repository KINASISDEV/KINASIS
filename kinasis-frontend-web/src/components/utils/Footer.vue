<script>
</script>

<template>
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>KINASIS</h3>
                <p>Transformando ideas en soluciones tecnológicas innovadoras</p>
            </div>

            <div class="footer-section">
                <h4>Contacto</h4>
                <p>Email: <a href="mailto:kinasisdev@outlook.com">kinasisdev@outlook.com</a></p>
                <p>Tel: +52 56 2730 8641</p>
                <p>CDMX, México.</p>
            </div>

            <div class="footer-section">
                <h4>Soporte</h4>
                <p><a href="/Contact">Contacto</a></p>
                <p><a href="/WorkPage">Servicios</a></p> <!-- cambiar direccion a servicios -->
                <p><a href="https://kinasis.netlify.app/" target="_blank">Mas sobre nosotros</a></p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>KINASIS. Todos los derechos reservados.</p>
            <p>Desarrollado con ❤️ por KINASIS Team</p>
        </div>
    </footer>
</template>

<style scoped>
  .site-footer {
    background: var(--primary-color);
    color: var(--secondary-color);
    padding: 3rem 2rem 1.5rem;
    margin-top: auto;
    width: 100%;
    position: relative;
    z-index: 100;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-section h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    font-family: 'Jura', sans-serif;
    color: var(--secondary-color);
  }

  .footer-section h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-family: 'Jura', sans-serif;
    color: var(--secondary-color);
  }

  .footer-section p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
  }

  .footer-section a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-section a:hover {
    color: var(--secondary-color);
    text-decoration: underline;
    opacity: 0.8;
  }

  .footer-bottom {
    border-top: 1px solid var(--secondary-color);
    padding-top: 1.5rem;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-bottom p {
    font-size: 0.875rem;
    color: var(--secondary-color);
    margin: 0.25rem 0;
  }
</style>