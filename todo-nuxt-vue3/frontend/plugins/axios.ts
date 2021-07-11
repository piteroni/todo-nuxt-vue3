import { Context } from "@nuxt/types/app"
import { HttpStatusCode } from "@/shared/http"
import { range } from "@/shared/util"

const legalStatuses = [
  HttpStatusCode.UNAUTHORIZED,
  HttpStatusCode.FORBIDDEN,
  HttpStatusCode.UNPROCESSABLE_ENTITY
]

export default function ({ $axios, error }: Context): void {
  $axios.setHeader("Content-Type", "application/json")

  $axios.onError(e => {
    if (typeof e.response === "undefined") {
      console.error(e)

      return error({
        message: e.message
      })
    }

    const status = e.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR

    if (
      (!legalStatuses.includes(status) && range(400, 499).includes(status)) ||
        range(500, 503).includes(status)
    ) {
      error({ message: `
        An error occurred in the application and your page could not be served,
        If you are the application owner, check your logs for details
      ` })
    }
  })
}
