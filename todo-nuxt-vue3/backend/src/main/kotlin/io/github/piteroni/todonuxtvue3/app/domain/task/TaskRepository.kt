package io.github.piteroni.todonuxtvue3.app.domain.task

import io.github.piteroni.todonuxtvue3.app.domain.user.UserId

interface TaskRepository {
    fun save(task: Task): Task

    fun find(taskId: TaskId): Task?

    fun findAllByUserId(userId: UserId): List<Task>

    fun remove(taskId: TaskId)
}
