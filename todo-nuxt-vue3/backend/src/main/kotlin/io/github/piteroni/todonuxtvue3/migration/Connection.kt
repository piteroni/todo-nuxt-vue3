package io.github.piteroni.todonuxtvue3.migration

import io.github.piteroni.todonuxtvue3.app.presentation.utils.Config
import org.jetbrains.exposed.sql.Database

/**
 * connect to database.
 */
fun connect() {
    Database.connect(
        url = Config.get("DB_URL"),
        driver = Config.get("DB_DRIVER"),
        user = Config.get("DB_USERNAME"),
        password = Config.get("DB_PASSWORD")
    )
}
