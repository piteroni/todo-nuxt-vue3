package io.github.piteroni.todonuxtvue3.app.domain.user

interface UserRepository {
    fun find(userId: UserId): User?
    fun findByEmail(email: Email): User?
}
