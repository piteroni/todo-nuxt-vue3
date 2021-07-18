package io.github.piteroni.todonuxtvue3.app.presentation.transfer.responses

import kotlinx.serialization.Serializable

@Serializable
data class CreatedRetainedTask(val id: Int, val name: String)
