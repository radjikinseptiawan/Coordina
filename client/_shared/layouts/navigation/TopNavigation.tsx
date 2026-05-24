import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TopNavigation({
  source,
  username,
  email,
}: {
  source: string | null;
  username: string | null;
  email: string | null;
}) {
  return (
    <div className="w-full bg-white z-40  fixed top-0 shadow px-12 py-1">
      <div className="flex cursor-pointer items-center gap-2 justify-items-end w-full flex-row-reverse">
        <Avatar>
          <AvatarImage src={source ?? ""} />
        </Avatar>
        <div className="text-end">
          <h1 className="text-[12px] text-black font-semibold">{username}</h1>
          <p className="text-[10px] text-gray-600">{email}</p>
        </div>
      </div>
    </div>
  );
}
