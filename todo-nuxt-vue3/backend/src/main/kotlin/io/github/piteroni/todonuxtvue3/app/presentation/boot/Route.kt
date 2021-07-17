package io.github.piteroni.todonuxtvue3.app.presentation.boot

import io.github.piteroni.todonuxtvue3.app.infrastructure.repositories.UserRepository
import io.github.piteroni.todonuxtvue3.app.presentation.auth.jwt.JWT
import io.github.piteroni.todonuxtvue3.app.presentation.auth.jwt.makeJWTConfig
import io.github.piteroni.todonuxtvue3.app.presentation.controllers.IdentificationController
import io.github.piteroni.todonuxtvue3.app.presentation.controllers.UserController
import io.github.piteroni.todonuxtvue3.app.usecase.user.UserUseCase
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.routing.routing

internal fun Application.applyRoutes() {
    routing {
        internalApiRoutes()
    }
}

internal fun Route.internalApiRoutes() {
    val userUseCase = UserUseCase(UserRepository())
    val identificationController = IdentificationController(JWT(makeJWTConfig()), userUseCase)
    val userController = UserController(userUseCase)

    route("/api/i/v0") {
        route("/auth/user") {
            authenticate {
                get {
                    userController.getLoginUserProfile(call)
                }
            }
        }

        post("/login") {
            identificationController.login(call)
        }

        authenticate {
            route("/credentials") {
                post("/verify") { call.respond(HttpStatusCode.OK) }
            }
        }
    }
}
