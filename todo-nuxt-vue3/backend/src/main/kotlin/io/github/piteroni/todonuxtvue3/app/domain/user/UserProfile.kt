package io.github.piteroni.todonuxtvue3.app.domain.user

import io.github.piteroni.todonuxtvue3.app.domain.DomainException

data class UserProfile(val name: String) {
    init {
        if (name.isEmpty()) {
            throw DomainException("User name must not be empty")
        }
    }
}
