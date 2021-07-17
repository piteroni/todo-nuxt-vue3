package io.github.piteroni.todonuxtvue3.app.presentation.controllers

import io.github.piteroni.todonuxtvue3.app.presentation.auth.UserIdPrincipal
import io.github.piteroni.todonuxtvue3.app.presentation.exceptions.InternalServerErrorException
import io.github.piteroni.todonuxtvue3.app.presentation.exceptions.UnauthorizedException
import io.github.piteroni.todonuxtvue3.app.presentation.transfer.responses.LoginUser
import io.github.piteroni.todonuxtvue3.app.presentation.transfer.responses.LoginUserProfile
import io.github.piteroni.todonuxtvue3.app.usecase.user.UserNotPresentException
import io.github.piteroni.todonuxtvue3.app.usecase.user.UserProfileAcquisitionInputData
import io.github.piteroni.todonuxtvue3.app.usecase.user.UserUseCase
import io.ktor.application.ApplicationCall
import io.ktor.auth.principal
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond

class UserController(private val userUseCase: UserUseCase) {
    suspend fun getLoginUserProfile(call: ApplicationCall) {
        val userId = call.principal<UserIdPrincipal>()?.value ?: throw UnauthorizedException()

        val profile = try {
            userUseCase.getUserProfile(UserProfileAcquisitionInputData(userId))
        } catch (exception: UserNotPresentException) {
            throw InternalServerErrorException(exception)
        }

        call.respond(HttpStatusCode.OK, LoginUser(LoginUserProfile(profile.name)))
    }
}
