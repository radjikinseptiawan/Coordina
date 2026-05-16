import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function createComityHandler(tcx: PrismaService, body, userId: string) {
    try {
        const profile = await tcx.user_Profile.findFirst({
            where: {
                account_id: userId
            }
        })

        if (!profile) {
            throw new HttpException({
                message: "Profile not found",
                httpStatus: HttpStatus.NOT_FOUND,
                error: "Profile not found"
            }, HttpStatus.NOT_FOUND)
        }

        const data = await tcx.comity.create({
            data: {
                comity_name: body.comity_name,
                comity_short_name: body.comity_short_name,
                comity_area_of_operational: body.comity_area_of_operational,
                comity_city_of_operational: body.comity_city_of_operational,
                comity_background: body.comity_background,
                comity_created_date: body.comity_created_date,
            }
        })

        if (!data) {
            throw new HttpException({
                message: "Data not found",
                httpStatus: HttpStatus.NOT_FOUND,
                error: "Data not found"
            }, HttpStatus.NOT_FOUND)
        }


        await tcx.member_Profiles_Comities.create({
            data: {
                member_id: profile.id as string,
                comity_id: data.id as string,
                account_id: userId as string,
                comity_mission: "",
                comity_vision: "",
            }
        })

        console.log(data)

        return new HttpException({
            message: "Data berhasil ditambahkan",
            httpStatus: HttpStatus.OK,
            data: data
        }, HttpStatus.OK)

    } catch (e) {
        console.error(e)
        return new HttpException({
            message: "Internal server error",
            HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            error: e
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

}