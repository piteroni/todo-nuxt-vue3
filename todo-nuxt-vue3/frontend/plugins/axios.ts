import { Context } from "@nuxt/types/app"
import { HttpStatusCode } from "@/shared/http"
import { range } from "@/shared/util"

export default function ({ $axios, error }: Context): void {
  $axios.setBaseURL("http://localhost:8080/api/i/v0")

  $axios.setHeader("Content-Type", "application/json")

  $axios.onError(e => {
    const status = e?.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR

    const errorStatuses = range(500, 599)

    errorStatuses.push(HttpStatusCode.BAD_REQUEST)
    errorStatuses.push(HttpStatusCode.NOT_FOUND)

    if (errorStatuses.includes(status)) {
      error({ message: "An error occurred in the application and your page could not be served, If you are the application owner, check your logs for details" })
    }
  })
}
