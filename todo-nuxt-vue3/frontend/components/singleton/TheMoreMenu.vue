<template>
  <div>
    <button class="z-10 block rounded-md bg-white p-2 focus:outline-none" @click="open = !open">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </div>
    </button>

    <div v-if="open" class="absolute right-2 mt-2 py-2 w-36 bg-white rounded-md shadow-xl z-20">
      <a class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" @click="logout">
        ログアウト
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from "@nuxtjs/composition-api"

export default defineComponent({
  setup() {
    const { $auth } = useContext()

    const open = ref(false)

    const logout = () => {
      $auth.logout()
    }

    return {
      open,
      logout
    }
  }
})
</script>
