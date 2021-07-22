package io.github.piteroni.todonuxtvue3.app.presentation.transfer.requests

import io.github.piteroni.todonuxtvue3.app.presentation.transfer.requests.RequestValidationException
import io.github.piteroni.todonuxtvue3.app.presentation.transfer.requests.PresentationException
import kotlinx.serialization.Serializable

@Serializable
data class RetainedTaskCreateRequest(val name: String) : HttpRequest {
    private val nameSize = 80

    override fun validate() {
        if (name.length > nameSize) {
            val cause = RequestValidationException(
                "Illegal task name size, must be less then $nameSize. size = ${name.length}"
            )
            throw PresentationException("Illegal task name size, must be less then $nameSize", cause)
        }
    }
}
