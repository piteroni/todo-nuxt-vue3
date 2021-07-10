<template>
  <form class="max-w-3xl mx-auto mt-8 bg-white overflow-hidden border border-gray-300 rounded">
    <div class="card-title">
      ログインフォーム
    </div>

    <div class="py-8">
      <div class="flex px-3 mb-6 justify-center items-center">
        <label
          for="email"
          class="block w-1/6 text-gray-700 text-sm mb-2 text-right"
        >
          メールアドレス
        </label>

        <div class="w-3/6 ml-6 mb-3">
          <input
            id="email"
            v-model="form.email.$value"
            :class="{ 'border-red-500 focus:border-red-500': form.email.$dirty && form.email.$anyInvalid }"
            class="w-full appearance-none blocktext-gray-700 py-3 px-4 border-2 outline-none rounded leading-tight focus:border-gray-500 transition-all duration-200"
            type="email"
          >

          <p
            v-if="form.email.$dirty && form.email.$anyInvalid"
            class="w-full mt-2 text-red-500 text-xs transition-all duration-200"
          >
            {{ form.email.required.$message }}
          </p>
        </div>
      </div>

      <div class="flex px-3 mb-6 justify-center items-center">
        <label
          for="password"
          class="block w-1/6 text-gray-700 text-sm mb-2 text-right"
        >
          パスワード
        </label>

        <div class="w-3/6 ml-6 mb-3">
          <input
            id="password"
            v-model="form.password.$value"
            :class="{ 'border-red-500 focus:border-red-500': form.password.$dirty && form.password.$anyInvalid }"
            class="w-full appearance-none blocktext-gray-700 py-3 px-4 border-2 outline-none rounded leading-tight focus:border-gray-500 transition-all duration-200"
            type="password"
          >

          <p
            v-if="form.password.$dirty && form.password.$anyInvalid"
            class="w-full mt-2 text-red-500 text-xs transition-all duration-200"
          >
            {{ form.password.required.$message }}
          </p>

          <p
            v-if="message"
            class="w-full mt-2 text-red-500 text-xs transition-all duration-200"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <button
          @click="login"
          class="bg-blue-500 flex text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:opacity-80 transition-all duration-300"
          type="button"
        >
          <app-circle v-if="isLoggedIn" />
          ログイン
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, inject } from "@nuxtjs/composition-api"
import { AxiosError } from "axios"
import { useValidation } from "vue-composable"
import { required } from "@/shared/validation"
import { authenticationTokenKey, AuthenticationToken } from "@/hooks/authenticationToken"
import { HttpStatusCode } from "@/shared/http"
import AppCircle from "@/components/basic/AppCircle.vue"

export default defineComponent({
  components: {
    "app-circle": AppCircle
  },
  setup() {
    const { redirect } = useContext()

    const email = ref("")
    const password = ref("")
    const message = ref("")
    const isLoggedIn = ref(false)

    const { fetch } = inject(authenticationTokenKey) as AuthenticationToken

    const form = useValidation({
      email: {
        $value: email,
        required: {
          $validator: required,
          $message: ref("必須項目です"),
        },
      },
      password: {
        $value: password,
        required: {
          $validator: required,
          $message: ref("必須項目です"),
        },
      }
    })

    const login = async (): Promise<void> => {
      message.value = ""

      if (form.$anyInvalid) {
        return
      }

      isLoggedIn.value = true

      try {
        await fetch(email.value, password.value)
      } catch (e) {
        if (!e.isAxiosError) {
          throw e
        }

        const ex: AxiosError = e

        if (typeof ex.response === "undefined") {
          throw e
        }

        switch (ex.response.status) {
          case HttpStatusCode.UNPROCESSABLE_ENTITY:
          case HttpStatusCode.UNAUTHORIZED:
            message.value = ex.response.data.message
            return
          default:
            console.error(ex)
            return
        }
      } finally {
        isLoggedIn.value = false
      }

      redirect("/tasks")
    }

    return {
      form,
      login,
      message,
      isLoggedIn,
    }
  }
})
</script>

<style scoped>
.card-title {
  font-size: 14.5px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
