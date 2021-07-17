package io.github.piteroni.todonuxtvue3.app.usecase.user

import io.github.piteroni.todonuxtvue3.app.domain.DomainException
import io.github.piteroni.todonuxtvue3.app.domain.user.Email
import io.github.piteroni.todonuxtvue3.app.domain.user.Password
import io.github.piteroni.todonuxtvue3.app.domain.user.RawPassword
import io.github.piteroni.todonuxtvue3.app.domain.user.UserId
import io.github.piteroni.todonuxtvue3.app.domain.user.UserProfile
import io.github.piteroni.todonuxtvue3.app.domain.user.UserRepository
import org.mindrot.jbcrypt.BCrypt

class UserUseCase(private val userRepository: UserRepository) {
    /**
     * authenticate the UserAccount.
     *
     * @param inputData
     * @return ID of the authenticated user account.
     * @throws AuthenticateInputDataException
     * @throws AuthenticationException
     */
    fun authenticate(inputData: AuthenticateInputData): Int {
        val email: Email
        val password: Password

        try {
            email = Email(inputData.email)
            password = RawPassword(inputData.password)
        } catch (exception: DomainException) {
            throw AuthenticateInputDataException(exception.message!!)
        }

        val user = userRepository.findByEmail(email)
            ?: throw AuthenticationException("there is no user matching the specified email. email = ${email.value}")

        if (!BCrypt.checkpw(password.value, user.account.password.value)) {
            throw AuthenticationException("password is wrong. email = ${email.value}")
        }

        return user.id.value
    }

    /**
     * Retrieve profiles for users that match the specified user ID.
     *
     * @param inputData
     * @return Profile of the specified user.
     * @throws UserNotPresentException
     */
    fun getUserProfile(inputData: UserProfileAcquisitionInputData): UserProfile {
        val userId = UserId(inputData.userId)

        return userRepository.find(userId)?.profile
            ?: throw UserNotPresentException("specified user does not exist. userId = $userId")
    }
}
