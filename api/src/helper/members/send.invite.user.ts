import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function sendInviteUser(tcx: PrismaService, search, user) {
  const [comity, account] = await Promise.all([
    tcx.comity.findFirst({
      where: {
        urlLink: search.organisasi,
      },
    }),
    tcx.accounts.findFirst({
      where: {
        OR: [{ email: search.q }, { username: search.q }],
      },
    }),
  ]);

  console.log('ini yg ngundang', user);

  console.log('ini user yang diundang', account);

  if (!comity) {
    throw new HttpException(
      { message: 'Comity not found!' },
      HttpStatus.NOT_FOUND,
    );
  }

  if (!account) {
    throw new HttpException(
      { message: 'Account not found!' },
      HttpStatus.NOT_FOUND,
    );
  }

  const users = await tcx.comity_Member_Request.create({
    data: {
      account_id: account.id,
      comity_id: comity?.id,
      requested_by: user,
      type: 'invitation_request',
      status: 'Pending',
    },
  });

  console.log('ini user yang diundang', users);

  return new HttpException(
    {
      message: 'User found!',
      data: users,
    },
    HttpStatus.OK,
  );
}
