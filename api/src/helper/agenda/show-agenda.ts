import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function ShowAgenda(tcx: PrismaService, comityUrl) {
  try {
    const comity = await tcx.comity.findFirst({
      where: {
        urlLink: comityUrl,
      },
    });

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed to show agenda',
          comity,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const agenda = await tcx.agenda.findMany({
      orderBy: {
        tanggal_agenda: 'desc',
      },
      where: {
        comity_id: comity.id,
      },
    });

    return new HttpException(
      {
        message: 'Success get data',
        data: agenda,
      },
      HttpStatus.OK,
    );
  } catch (e: any) {
    throw new HttpException(
      {
        message: 'Error!',
        error: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
