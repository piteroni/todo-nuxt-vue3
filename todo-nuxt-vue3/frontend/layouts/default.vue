<template>
  <div class="relative justify-center min-h-screen bg-gray-100">
    <navbar>
      <logo />
    </navbar>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import TheNavbar from "@/components/singleton/TheNavbar.vue"
import TheLogo from "@/components/singleton/TheLogo.vue"

export default defineComponent({
  components: {
    "navbar": TheNavbar,
    "logo": TheLogo
  }
})
</script>
