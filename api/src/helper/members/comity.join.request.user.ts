import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from 'prisma/generated/browser';
import { PrismaService } from 'src/prisma/prisma.service';

export default async function ComityCreateJoinRequest(
  tcx: PrismaService,
  search,
  user,
) {
  try {
    console.log(search);
    const comity = await tcx.comity.findFirst({
      where: {
        urlLink: search.id,
      },
    });

    if (!comity) {
      throw new HttpException(
        {
          message: 'Unavailable Comity!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const requestJoin = await tcx.comity_Member_Request.create({
      data: {
        comity_id: comity.id,
        requested_by: user,
        status: 'Pending',
        account_id: user,
        type: 'request_join',
      },
    });

    if (!requestJoin) {
      throw new HttpException(
        {
          message: 'Failed to join comity!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Request has been sended!',
      data: requestJoin,
    };
  } catch (err: any) {
    throw new HttpException(
      {
        message: 'Failed to create request!',
        error: err,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
