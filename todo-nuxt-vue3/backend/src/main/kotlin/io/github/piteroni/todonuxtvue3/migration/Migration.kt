package io.github.piteroni.todonuxtvue3.migration

import io.github.piteroni.todonuxtvue3.app.infrastructure.dao.TaskMapper
import io.github.piteroni.todonuxtvue3.app.infrastructure.dao.UserMapper
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction

fun migrate() {
    transaction {
        addLogger(StdOutSqlLogger)

        SchemaUtils.create(UserMapper)
        SchemaUtils.createMissingTablesAndColumns(UserMapper)

        SchemaUtils.create(TaskMapper)
        SchemaUtils.createMissingTablesAndColumns(TaskMapper)
    }
}

fun main() {
    connect()
    migrate()
    insert()
}
