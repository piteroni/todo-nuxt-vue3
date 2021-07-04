package io.github.piteroni.todonuxtvue3.app.infrastructure.dao

import io.github.piteroni.todonuxtvue3.app.domain.user.User
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.CurrentDateTime

object UserMapper : IntIdTable("users") {
    val name = varchar("name", 256)
    val email = varchar("email", 256).uniqueIndex()
    val password = varchar("password", 1024)
    val createdAt = datetime("created_at").defaultExpression(CurrentDateTime())
    val updatedAt = datetime("updated_at").defaultExpression(CurrentDateTime())
}

class UserDataSource(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserDataSource>(UserMapper)

    var name by UserMapper.name
    var email by UserMapper.email
    var password by UserMapper.password
    val tasks by TaskDataSource referrersOn TaskMapper.user
    var createdAt by UserMapper.createdAt
    var updatedAt by UserMapper.updatedAt

    fun asUser() = User.reconstruct(id.value, email, password)
}
