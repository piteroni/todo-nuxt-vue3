package io.github.piteroni.todonuxtvue3.app.usecase.user

class AuthenticationException(message: String) : Exception(message)

class AuthenticateInputDataException(message: String) : Exception(message)

class UserNotPresentException(message: String) : Exception(message)

data class AuthenticateInputData(val email: String, val password: String)

data class UserProfileAcquisitionInputData(val userId: Int)
