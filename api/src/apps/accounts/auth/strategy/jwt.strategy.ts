import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let data = req?.cookies?.access_token;
                    if (!data) return null
                    return data
                }
            ]),
            secretOrKey: process.env.JWT_SECRET as string,
            ignoreExpiration: false,
        })
    }

    async validate(payload: any) {
        console.log("Ini validasi", payload)
        return { userId: payload.id, username: payload.username, email: payload.email }
    }
}