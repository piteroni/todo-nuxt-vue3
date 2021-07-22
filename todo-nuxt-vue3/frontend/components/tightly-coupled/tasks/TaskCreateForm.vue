<template>
  <div class="mt-12">
    <p class="pb-2 mt-1 text-base text-gray-500">
      タスク登録
    </p>

    <div class="flex items-center">
      <input
        id="taskName"
        v-model="form.taskName.$value"
        :class="{ 'border-red-500 focus:border-red-500': form.taskName.$dirty && form.taskName.$anyInvalid }"
        class="w-96 appearance-none blocktext-gray-700 py-3 px-2 bg-transparent border-gray-300 border-b-2 outline-none rounded leading-tight focus:border-gray-500 transition-all duration-200"
        type="text"
      >

      <div class="ml-3">
        <div @click="createTask">
          <app-plus />
        </div>
      </div>
    </div>

    <div>
      <p
        v-if="form.taskName.$dirty && form.taskName.$anyInvalid"
        class="passwordErrorMessage w-full mt-2 text-red-500 text-xs transition-all duration-200"
      >
        {{ form.taskName.required.$message }}
      </p>

      <p
        v-if="message"
        class="errorMessage w-full mt-2 text-red-500 text-xs transition-all duration-200"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosError } from "axios"
import { defineComponent, ref, useContext, inject } from "@nuxtjs/composition-api"
import { useValidation } from "vue-composable"
import { retainedTaskKey } from "@/composables/retainedTask"
import { HttpStatusCode } from "@/shared/http"
import { required } from "@/shared/validation"
import AppPlus from "@/components/basic/AppPlus.vue"

export default defineComponent({
  components: {
    "app-plus": AppPlus
  },
  setup() {
    const { error } = useContext()

    const retainedTask = inject(retainedTaskKey)!!

    const message = ref("")

    const form = useValidation({
      taskName: {
        $value: ref(""),
        required: {
          $validator: required,
          $message: ref("必須項目です"),
        }
      }
    })

    const createTask = async () => {
      message.value = ""

      form.$touch()

      if (form.$anyInvalid) {
        return
      }

      try {
        await retainedTask.createTask(form.taskName.$value)
      } catch (e) {
        if (!e.isAxiosError) {
          error({ message: e.message })
          return console.error(e)
        }

        const response = (e as AxiosError).response

        if (!response) {
          return
        }

        if (response.status === HttpStatusCode.UNPROCESSABLE_ENTITY) {
          message.value = response.data.message
        }

        return
      }

      form.taskName.$value = ""
      form.taskName.$reset()
    }

    return {
      form,
      message,
      createTask
    }
  }
})
</script>
