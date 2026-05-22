import { Controller, Get, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "../guards/auth.google.guard";
import { googleAuthFailed, googleAuth as googleAuthHelper } from "src/helper/accounts/auth/resources/auth-resources";
import { AuthGoogleService } from "../services/auth.google.service";
import { configAccessToken } from "src/helper/accounts/auth/resources/auth-cookies";

@Controller('auth')
export class AuthGoogleController {
    constructor(private readonly googleAuthService: AuthGoogleService) { }

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    googleSign() { }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async signInGoogle(@Req() req, @Res() res) {
        try {
            const user = req.user;
            const accessToken = await this.googleAuthService.generateAccessToken(user);
            const html = googleAuthHelper(user);

            res.cookie("access_token", accessToken, configAccessToken)


            res.send(html)
        } catch (err) {
            res.setHeader("Content-Type", "text/html")
            const user = req.user;
            const html = googleAuthFailed(user)
            res.send(html)
        }
    }
}