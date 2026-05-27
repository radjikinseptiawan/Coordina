import { HttpException, HttpStatus } from '@nestjs/common';
import { EditProfileDto } from 'src/apps/profile/dto/profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export async function editProfileHelper(
  prisma: PrismaService,
  id: string,
  body: EditProfileDto,
) {
  try {
    const updatedData: any = {
      fullname: body.fullname,
      number_phone: body.number_phone,
      image: body.image?.url,
      updated_at: new Date(),
    };

    const data = await prisma.user_Profile.update({
      where: {
        account_id: id,
      },
      data: updatedData,
    });

    if (!data) {
      return new HttpException(
        {
          message: 'Profile not found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (body.email || body.username) {
      const updateAccounts = await prisma.accounts.update({
        where: {
          id: id,
        },
        data: {
          username: body.username,
          email: body.email,
          updated_at: new Date(),
        },
      });
    }

    return new HttpException(
      {
        message: 'Profile Updated',
        status: HttpStatus.OK,
        data,
      },
      HttpStatus.OK,
    );
  } catch (error: any) {
    return new HttpException(
      {
        message: 'Internal Server Error',
        detail: error.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
