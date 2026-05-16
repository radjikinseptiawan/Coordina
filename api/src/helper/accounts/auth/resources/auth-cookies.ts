import { CookieOptions } from "express";

const BASE_COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
}

const ACCESS_TOKEN_EXPIRES = 15 * 60 * 1000

export const configAccessToken: CookieOptions = {
    ...BASE_COOKIE_CONFIG,
    maxAge: ACCESS_TOKEN_EXPIRES,
}