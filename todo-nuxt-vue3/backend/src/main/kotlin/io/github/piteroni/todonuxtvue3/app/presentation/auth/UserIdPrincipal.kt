package io.github.piteroni.todonuxtvue3.app.presentation.auth

import io.ktor.auth.Principal
import kotlinx.serialization.Serializable

@Serializable
data class UserIdPrincipal(val value: Int) : Principal
