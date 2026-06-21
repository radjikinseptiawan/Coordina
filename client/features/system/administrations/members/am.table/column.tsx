import { Member } from "@/_shared/custom/@types/member.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original.member.image} />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "role.name",
    header: "Role",
  },
  {
    accessorKey: "member.fullname",
    header: "Fullname",
  },
  {
    accessorKey: "account.username",
    header: "Username",
  },
  {
    accessorKey: "member.number_phone",
    header: "Phone Number",
  },
  {
    accessorKey: "account.email",
    header: "Email",
  },
  {
    header: "Detail",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Button onClick={() => router.push(`?show=${row.original.member.id}`)}>
          Detail
        </Button>
      );
    },
  },
];
