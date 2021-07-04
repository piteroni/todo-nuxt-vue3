package io.github.piteroni.todonuxtvue3.app.presentation.transfer.requests

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest(val email: String, val password: String) : HttpRequest {
    private val emailSize = 256
    private val passwordSize = 128

    override fun validate() {
        if (email.length > emailSize) {
            val cause = RequestValidationException(
                "Illegal email size, must be less then $emailSize. size = ${email.length}"
            )

            throw PresentationException("Illegal email size, must be less then $emailSize", cause)
        }

        if (password.length > passwordSize) {
            val cause = RequestValidationException(
                "Illegal password size, must be less then $passwordSize. size = ${password.length}"
            )

            throw PresentationException("Illegal password size, must be less then $passwordSize", cause)
        }
    }
}
