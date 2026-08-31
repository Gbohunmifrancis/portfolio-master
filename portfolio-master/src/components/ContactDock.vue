<template>
  <aside class="contact-dock" aria-label="Contact Francis">
    <span class="contact-dock-label"><i aria-hidden="true"></i> Contact me</span>
    <div class="contact-dock-actions">
      <a class="contact-dock-email" href="mailto:francisgbohunmi@gmail.com" aria-label="Email Francis" title="Email Francis">
        <BsEnvelope aria-hidden="true" />
      </a>
      <a
        class="contact-dock-whatsapp"
        href="https://wa.me/2348124922244?text=Hello%20Francis%2C%20I%20would%20like%20to%20talk%20about%20a%20project."
        target="_blank"
        rel="noreferrer"
        aria-label="Message Francis on WhatsApp at +234 812 492 2244"
        title="WhatsApp +234 812 492 2244"
      >
        <BsWhatsapp aria-hidden="true" />
      </a>
      <a class="contact-dock-phone" href="tel:+2348124922244" aria-label="Call Francis at +234 812 492 2244" title="Call +234 812 492 2244">
        <BsTelephone aria-hidden="true" />
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { BsEnvelope, BsTelephone, BsWhatsapp } from '@kalimahapps/vue-icons/bs';
</script>
