package io.github.piteroni.todonuxtvue3.app.presentation.transfer.requests

/**
 * Indicates that the Content-Type or request schema is invalid.
 */
class RequestValidationException(message: String) : Exception(message)

/**
 * Used to tell the client about the error as it is.
 */
class PresentationException(message: String, cause: Exception) : Exception(message, cause)

interface HttpRequest {
    /**
     * validate of request payload.
     *
     * @throws RequestValidationException
     */
    fun validate()
}
