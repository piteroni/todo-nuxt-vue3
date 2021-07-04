package io.github.piteroni.todonuxtvue3.app.presentation.auth.jwt

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier

fun makeJWTVerifier(config: JWTConfig): JWTVerifier = JWT
    .require(config.algorithm)
    .withAudience(config.audience)
    .withIssuer(config.issuer)
    .build()
