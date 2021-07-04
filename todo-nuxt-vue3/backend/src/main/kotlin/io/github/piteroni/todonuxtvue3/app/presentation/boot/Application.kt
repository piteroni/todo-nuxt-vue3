package io.github.piteroni.todonuxtvue3.app.presentation.boot

import io.ktor.application.Application

fun Application.main() {
    connectToDatabase()
    applyMiddlewares()
    applyRoutes()
}
