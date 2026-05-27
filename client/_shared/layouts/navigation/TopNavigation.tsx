"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu, MenuIcon, User } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DROPDOWN_VARIANTS, getRoute } from "./navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogoutDialogs from "./logoutDialogs";
import { getSpesificUser } from "@/service/users.service";
import { SpesificUsersType } from "@/_shared/custom/@types/user.type";

export default function TopNavigation({
  username,
  email,
}: {
  username: string | null;
  email: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<SpesificUsersType>();
  const profileUsers = async () => {
    try {
      const data = await getSpesificUser();
      console.log("dari topNavigationBar.tsx", data);
      setData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    profileUsers();
  }, []);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white z-40  fixed top-0 shadow px-12 py-1"
      >
        <div className="flex cursor-pointer items-center gap-2 justify-items-end w-full flex-row-reverse">
          <Avatar>
            <AvatarImage
              src={
                data?.user_profile.image ||
                process.env.NEXT_PUBLIC_DEFAULT_PROFILE
              }
            />
          </Avatar>
          <div className="text-end">
            <h1 className="text-[12px] text-black font-semibold">
              {data?.username}
            </h1>
            <p className="text-[10px] text-gray-600">{data?.email}</p>
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && <MenuDropdown />}</AnimatePresence>
      <LogoutDialogs />
    </>
  );
}

const MenuDropdown = () => {
  const pathname = usePathname();
  const route = getRoute();
  return (
    <motion.div
      variants={DROPDOWN_VARIANTS}
      initial={"hidden"}
      animate={"visible"}
      exit={"exit"}
      className="flex right-0 fixed top-10"
    >
      <div className="shadow bg-white flex flex-col gap-2 rounded-md p-2 w-72">
        {route.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.ref}
              className={`text-gray-500 flex items-center cursor-pointer hover:bg-gray-100 ${pathname == `/${item.ref}` ? "bg-gray-50" : "bg-white"} p-1 rounded-md gap-2`}
            >
              <Icon size={16} />
              {item.text}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
