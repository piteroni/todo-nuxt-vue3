<template>
  <div class="relative justify-center min-h-screen bg-gray-100">
    <navbar>
      <div>
        <logo />
      </div>
    </navbar>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import TheNavbar from "@/components/single-instance/TheNavbar.vue"
import TheLogo from "@/components/single-instance/TheLogo.vue"

export default defineComponent({
  components: {
    "navbar": TheNavbar,
    "logo": TheLogo
  }
})
</script>
