<template>
  <div class="relative justify-center min-h-screen bg-gray-100">
    <navbar>
      <span class="flex items-center">
        <logo />
      </span>

      <span class="flex items-center">
        <more-menu />
      </span>
    </navbar>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import TheNavbar from "@/components/singleton/TheNavbar.vue"
import TheLogo from "@/components/singleton/TheLogo.vue"
import TheMoreMenu from "@/components/singleton/TheMoreMenu.vue"

export default defineComponent({
  components: {
    "navbar": TheNavbar,
    "logo": TheLogo,
    "more-menu": TheMoreMenu
  }
})
</script>
