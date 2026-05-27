import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function getSpesificAccountsHandler(
  id: string,
  tcx: PrismaService,
) {
  try {
    const data = await tcx.accounts.findFirst({
      where: { id },
      include: {
        user_profile: true,
      },
    });

    if (!data) {
      throw new NotFoundException(`Account dengan ID ${id} tidak ditemukan`);
    }
    return data;
  } catch (e) {
    return {
      error: e,
    };
  }
}
