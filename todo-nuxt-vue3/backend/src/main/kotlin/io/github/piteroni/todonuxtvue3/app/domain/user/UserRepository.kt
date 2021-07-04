package io.github.piteroni.todonuxtvue3.app.domain.user

interface UserRepository {
    fun findByEmail(email: Email): User?
}
