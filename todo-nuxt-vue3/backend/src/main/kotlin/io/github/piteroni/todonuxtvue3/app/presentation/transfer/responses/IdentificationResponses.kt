package io.github.piteroni.todonuxtvue3.app.presentation.transfer.responses

import kotlinx.serialization.Serializable

@Serializable
data class AuthenticationToken(val token: String) : HttpResponse
