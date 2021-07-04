package io.github.piteroni.todonuxtvue3.app.domain.task

import io.github.piteroni.todonuxtvue3.app.domain.user.UserId

class Task(
    val id: TaskId,
    val userId: UserId,
    val name: TaskName
) {
    companion object {
        fun reconstruct(taskId: Int, userId: Int, name: String) = Task(TaskId(taskId), UserId(userId), TaskName(name))

        fun create(userId: UserId, name: TaskName) = Task(
            TaskId.unregistered(),
            userId,
            name
        )
    }
}
