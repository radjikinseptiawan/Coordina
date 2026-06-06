import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function createComityHandler(
  tcx: PrismaService,
  body,
  userId: string,
) {
  try {
    const [profile, data] = await Promise.all([
      await tcx.user_Profile.findFirst({
        where: {
          account_id: userId,
        },
      }),
      await tcx.comity.create({
        data: {
          comity_name: body.comity_name,
          comity_icon: body.comity_icon,
          comity_short_name: body.comity_short_name,
          comity_area_of_operational: body.comity_area_of_operational,
          comity_city_of_operational: body.comity_city_of_operational,
          comity_background: body.comity_background,
          comity_created_date: body.comity_created_date,
        },
      }),
    ]);

    if (!profile) {
      throw new HttpException(
        {
          message: 'Profile not found',
          httpStatus: HttpStatus.NOT_FOUND,
          error: 'Profile not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!data) {
      throw new HttpException(
        {
          message: 'Data not found',
          httpStatus: HttpStatus.NOT_FOUND,
          error: 'Data not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const role = await tcx.comity_Role.createMany({
      data: [
        {
          name: 'Chairman',
          comity_id: data.id,
          description:
            'Chairman is the people who have a authority of organizations',
        },
        {
          name: 'Members',
          comity_id: data.id,
          description:
            'Members is the people where his part of the organization',
        },
      ],
      skipDuplicates: true,
    });

    const getRole = await tcx.comity_Role.findFirst({
      where: {
        name: 'Chairman',
        comity_id: data.id,
      },
    });

    await tcx.member_Profiles_Comities.create({
      data: {
        member_id: profile.id as string,
        comity_id: data.id as string,
        account_id: userId as string,
        role_id: getRole?.id as string,
      },
    });

    return new HttpException(
      {
        message: 'Data berhasil ditambahkan',
        httpStatus: HttpStatus.OK,
        data: data,
      },
      HttpStatus.OK,
    );
  } catch (e) {
    return new HttpException(
      {
        message: 'Internal server error',
        HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        error: e,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
