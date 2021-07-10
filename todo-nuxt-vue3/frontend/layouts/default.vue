<template>
  <div class="relative justify-center min-h-screen bg-gray-100">
    <navbar>
      <logo />
    </navbar>

    <authentication-token-provider>
      <Nuxt />
    </authentication-token-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import TheNavbar from "@/components/singleton/TheNavbar.vue"
import TheLogo from "@/components/singleton/TheLogo.vue"
import AuthenticationTokenProvider from "@/hooks/AuthenticationTokenProvider.vue"

export default defineComponent({
  components: {
    "authentication-token-provider": AuthenticationTokenProvider,
    "navbar": TheNavbar,
    "logo": TheLogo
  }
})
</script>
