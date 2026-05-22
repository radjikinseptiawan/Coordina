import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { JwtAuthGuard } from "../guards/auth.guard";
import { configAccessToken } from "src/helper/accounts/auth/resources/auth-cookies";

@Controller("v1_beta/accounts/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }


    @Get("validate")
    async forgotPassword(@Query("email") email: string
    ) {
        const getOtp = await this.authService.getOtp(email)
        return getOtp
    }

    @Post("change-password")
    async changePassword(@Query("email") email: string, @Query("otp") otp: string, @Body() body
    ) {
        const setOtp = await this.authService.changePassword(email, otp, body)
        return setOtp
    }


    // TODO: ON DEVELOPMENT
    @Get("email")
    async getAll() {
        return await this.authService.getAccounts()
    }


    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async getSpesific(@Param("id") id: string) {
        return await this.authService.getSpesificAccounts(id)
    }

    @Post("register")
    async register(
        @Body() body
    ) {
        return await this.authService.signUp(body)
    }

    @Post("login")
    async login(
        @Body() body,
        @Res() res
    ) {
        const user = body;
        const data = await this.authService.signIn(user)

        res.cookie("access_token", data.accessToken, configAccessToken)
        return res.json({ status: 200, message: "Login berhasil" })
    }

    @Delete("logout")
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request) {
        const userId = request.user?.id || request.user?.userId;
        return await this.authService.signOut(userId);
    }
}