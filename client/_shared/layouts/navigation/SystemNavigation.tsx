"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, LetterText, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DROPDOWN_VARIANTS, getRoute, getRouteSystem } from "./navigation";
import { ReactNode, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import LogoutDialogs from "./logoutDialogs";
import { getSpesificUser } from "@/service/dashboard/users.service";
import { SpesificUsersType } from "@/_shared/custom/@types/user.type";
import { Button } from "@/components/ui/button";
import { SLIDERS_VARIANT, systemRoute } from "./systemRoute";

export default function SystemNavigation({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sliders, setSliders] = useState<boolean>(true);
  const [data, setData] = useState<SpesificUsersType>();

  const profileUsers = async () => {
    try {
      const data = await getSpesificUser();
      setData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const widthResize = () => {
      if (window.innerWidth < 800) {
        setSliders(false);
      } else {
        setSliders(true);
      }
    };
    widthResize();
    window.addEventListener("resize", widthResize);
    return () => window.removeEventListener("resize", widthResize);
  }, []);

  useEffect(() => {
    profileUsers();
  }, []);

  return (
    <>
      <div className="w-screen lg:w-full h-10 bg-white z-50 flex justify-between fixed top-0 shadow px-3 py-1">
        <Button
          onClick={() => setSliders(!sliders)}
          variant={"ghost"}
          className="text-gray-500"
        >
          <Menu />
        </Button>
        <div className="flex items-center gap-2 justify-items-end w-full flex-row-reverse">
          <Avatar className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <AvatarImage
              src={
                data?.user_profile.image ||
                process.env.NEXT_PUBLIC_DEFAULT_PROFILE
              }
            />
          </Avatar>
          <div
            className="text-end cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1 className="text-[12px] text-black font-semibold">
              {data?.username}
            </h1>
            <p className="text-[10px] text-gray-600">{data?.email}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>{isOpen && <MenuDropdown />}</AnimatePresence>
      <LogoutDialogs />

      <div className="mt-10 w-full flex h-[calc(100vh-2.5rem)] overflow-hidden">
        <AnimatePresence>{sliders && <SlideBarNavigation />}</AnimatePresence>

        <div className="flex-1 overflow-y-auto p-5 min-w-0">{children}</div>
      </div>
    </>
  );
}

const SlideBarNavigation = () => {
  const { slug } = useParams();
  const pathname = usePathname().split("/");
  const currentPath = `${pathname[2] + "/" + pathname[3]}`;

  return (
    <motion.div
      variants={SLIDERS_VARIANT}
      animate={"visible"}
      initial={"hidden"}
      exit={"exit"}
      className="h-full z-40"
    >
      <div className="w-64 py-4 px-6 h-full bg-white shadow flex flex-col gap-3 overflow-y-auto">
        {systemRoute.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="py-1" key={index}>
              <div className="flex items-center gap-2">
                <Icon size={16} />
                <h1 className="font-semibold text-sm">{item.name}</h1>
              </div>
              <div className="px-2 py-1">
                {item.children.map((child, childIdx) => (
                  <Link
                    key={childIdx}
                    className={`flex ${child.href === currentPath ? "bg-gray-200 font-medium text-black" : "text-gray-500"} 
                    text-xs my-1 gap-2 items-center hover:cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors`}
                    href={`/${slug}/${child.href}`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const MenuDropdown = () => {
  const pathname = usePathname();
  const { slug } = useParams();
  const route = getRouteSystem(slug || "", pathname);

  return (
    <motion.div
      variants={DROPDOWN_VARIANTS}
      initial={"hidden"}
      animate={"visible"}
      exit={"exit"}
      className="flex right-3 fixed top-12 z-50" // Naikkan z-index biar di atas segalanya
    >
      <div className="shadow-lg bg-white border flex flex-col gap-1 rounded-md p-2 w-64">
        {route.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.ref}
              className={`text-gray-500 flex items-center cursor-pointer hover:bg-gray-100 ${
                pathname == `/${item.ref}`
                  ? "bg-slate-100 text-black"
                  : "bg-white"
              } p-2 rounded-md gap-2 text-sm`}
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
