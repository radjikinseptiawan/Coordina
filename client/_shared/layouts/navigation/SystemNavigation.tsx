"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  LetterText,
  LogOut,
  Menu,
  MenuIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DROPDOWN_VARIANTS, getRoute, getRouteSystem } from "./navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import LogoutDialogs from "./logoutDialogs";
import { getSpesificUser } from "@/service/users.service";
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
      console.log("dari topNavigationBar.tsx", data);
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
      <div className="w-screen lg:w-full bg-white z-40 flex justify-between  fixed top-0 shadow px-3 py-1">
        <Button
          onClick={() => setSliders(!sliders)}
          variant={"ghost"}
          className="text-gray-500"
        >
          <Menu />
        </Button>
        <div className="flex items-center gap-2 justify-items-end w-full  flex-row-reverse">
          <Avatar onClick={() => setIsOpen(!isOpen)}>
            <AvatarImage
              src={
                data?.user_profile.image ||
                process.env.NEXT_PUBLIC_DEFAULT_PROFILE
              }
            />
          </Avatar>
          <div className="text-end" onClick={() => setIsOpen(!isOpen)}>
            <h1 className="text-[12px] text-black font-semibold">
              {data?.username}
            </h1>
            <p className="text-[10px] text-gray-600">{data?.email}</p>
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && <MenuDropdown />}</AnimatePresence>
      <LogoutDialogs />
      <div className="mt-10 w-full flex gap-5">
        <AnimatePresence>{sliders && <SlideBarNavigation />}</AnimatePresence>
        <div>{children}</div>
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
    >
      <div className=" fixed md:relative  w-64 py-2 px-6 h-screen bg-white shadow flex flex-col gap-3">
        {systemRoute.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="py-1" key={index}>
              <div className="flex items-center gap-2">
                <Icon size={16} />
                <h1 className="font-semibold">{item.name}</h1>
              </div>
              <div className="px-2 py-1">
                {item.children.map((item, index) => (
                  <Link
                    key={index}
                    className={`flex ${item.href === currentPath ? "bg-gray-400" : ""} 
                    text-gray-500
                    gap-2 items-center hover:cursor-pointer hover:bg-gray-300 p-1 rounded-md`}
                    href={`/${slug}/${item.href}`}
                  >
                    {item.name}
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
