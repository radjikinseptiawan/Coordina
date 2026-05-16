import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtAuthGuard } from "./guards/auth.guard";
import { AuthGoogleController } from "./controllers/auth.google.controller";
import { GoogleStrategy } from "./strategy/google.strategy";
import { AuthGoogleService } from "./services/auth.google.service";

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: "24h"
        }
    })],
    controllers: [AuthController, AuthGoogleController],
    providers: [AuthService, JwtService, JwtStrategy, GoogleStrategy, AuthGoogleService],
    exports: [JwtStrategy, AuthService, AuthGoogleService]
})
export class AuthModule { }