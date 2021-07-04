package io.github.piteroni.todonuxtvue3.app.domain.user

class User(
    val id: UserId,
    val account: UserAccount
) {
    companion object {
        fun reconstruct(userId: Int, email: String, password: String) = User(
            UserId(userId),
            UserAccount(Email(email), HashedPassword(password))
        )
    }
}
