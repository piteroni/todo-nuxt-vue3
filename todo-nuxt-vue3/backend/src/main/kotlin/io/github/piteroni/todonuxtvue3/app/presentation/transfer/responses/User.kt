package io.github.piteroni.todonuxtvue3.app.presentation.transfer.responses

import kotlinx.serialization.Serializable

@Serializable
data class LoginUser(val user: LoginUserProfile)

@Serializable
data class LoginUserProfile(val name: String)
