package io.github.piteroni.todonuxtvue3.app.presentation.transfer.responses

import kotlinx.serialization.Serializable

interface HttpResponse

@Serializable
data class SimpleResponse(val message: String) : HttpResponse
