package io.github.piteroni.todonuxtvue3.app.infrastructure.repositories

import io.github.piteroni.todonuxtvue3.app.domain.user.Email
import io.github.piteroni.todonuxtvue3.app.domain.user.User
import io.github.piteroni.todonuxtvue3.app.infrastructure.dao.UserDataSource
import io.github.piteroni.todonuxtvue3.app.infrastructure.dao.UserMapper
import org.jetbrains.exposed.sql.transactions.transaction
import io.github.piteroni.todonuxtvue3.app.domain.user.UserRepository as IUserRepository

class UserRepository : IUserRepository {
    override fun findByEmail(email: Email): User? {
        return transaction {
            UserDataSource.find { UserMapper.email eq email.value }.firstOrNull()?.asUser()
        }
    }
}
