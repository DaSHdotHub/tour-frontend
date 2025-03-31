<template>
    <footer>
      <div class="footer-content">
        <p>Daniil Shaulov © {{ currentYear }}</p>
        <div class="social-links">
          <a href="https://linkedin.com/in/daniil-shaulov-87b5b2198" target="_blank" rel="noopener"
            aria-label="Visit my profile on LinkedIn (opens in a new tab)">
            <font-awesome-icon :icon="['fab', 'linkedin']" class="icon fa-2x" />
          </a>
          <a href="https://github.com/DaSHdotHub?tab=repositories" target="_blank" rel="noopener"
            aria-label="Visit my GitHub page (opens in a new tab)">
            <font-awesome-icon :icon="['fab', 'github']" class="icon fa-2x" />
          </a>
          <a href="https://xing.com/profile/Daniil_Shaulov/" target="_blank" rel="noopener"
            aria-label="Visit my profile on Xing (opens in a new tab)">
            <font-awesome-icon :icon="['fab', 'xing']" class="icon fa-2x" />
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'TheFooter',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style scoped>
  footer {
    background-color: var(--deep-navy);
    color: var(--pure-white);
    padding: 20px 0;
    text-align: center;
    margin-top: auto;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .icon {
    color: var(--golden-amber);
    transition: transform 0.3s ease;
    margin: 0 10px;
  }
  
  .icon:hover {
    transform: scale(1.5);
  }
  </style>