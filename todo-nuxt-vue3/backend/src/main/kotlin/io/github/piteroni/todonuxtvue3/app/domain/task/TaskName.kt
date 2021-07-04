package io.github.piteroni.todonuxtvue3.app.domain.task

import io.github.piteroni.todonuxtvue3.app.domain.DomainException

data class TaskName(val value: String) {
    init {
        if (value.isEmpty()) {
            throw DomainException("Empty tasks cannot be created")
        }
    }
}
