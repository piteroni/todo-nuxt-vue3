<template>
  <login-form />
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import LoginForm from "@/components/tightly-coupled/login/LoginForm.vue"

export default defineComponent({
  components: {
    "login-form": LoginForm
  }
})
</script>
