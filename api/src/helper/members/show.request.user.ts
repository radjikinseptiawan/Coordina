import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

export async function ShowComiyRequest(tcx: PrismaService, user){
        try {
      const data = await tcx.comity_Member_Request.findMany({
        where: {
          account_id: user,
          status: 'Pending',
        },
        include: {
          account: {
            select: {
              username: true,
            },
          },
          comity: true,
        },
      });

      if (!data) {
        throw new HttpException(
          {
            message: 'Failed to catch data!, Not Found',
            data,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return new HttpException(
        {
          message: 'Success to catch data!, OK',
          data,
        },
        HttpStatus.OK,
      );
    } catch (e: any) {
      throw new HttpException(
        {
          message: 'Failed to catch data',
          error: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

}