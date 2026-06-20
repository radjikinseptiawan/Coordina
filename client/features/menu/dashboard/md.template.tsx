"use client";
import { MenuDashboardControllers } from "./md.controllers/controllers";
import { MenuDashboardCards } from "./md.components/md.cards";
import { useEffect, useState } from "react";
import {
  IsLoadingContextProvider,
  IsOpenContextProvider,
  MemoComityProvider,
} from "./md.context";
import MenuDashboardSearchDialogs from "./md.dialogs/search.dialogs";
import MenuDashboardShowDialogs from "./md.dialogs/show.dialogs";
import { ComityData } from "@/_shared/custom/@types/comity.type";
import { getComitiesAll, getDataFind } from "@/service/dashboard/menu.service";
import { useRouter } from "next/navigation";
import { fetchData, getUserInformation } from "./md.hooks/md.utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function MenuDashboardTemplate() {
  const [data, setData] = useState<ComityData[]>([]);

  useEffect(() => {
    fetchData({ setData });
  }, []);
  return (
    <IsOpenContextProvider>
      <IsLoadingContextProvider>
        <MemoComityProvider>
          <div className="mx-4">
            <MenuDashboardControllers />
            <div className="grid justify-items-center grid-cols-1 gap-2 md:gap-x-1 md:gap-y-1 md:grid-cols-2 lg:grid-cols-3">
              <MenuDashboardCards />
            </div>
          </div>
          <MenuDashboardSearchDialogs />
          <MenuDashboardShowDialogs
            initialData={data}
          ></MenuDashboardShowDialogs>
        </MemoComityProvider>
      </IsLoadingContextProvider>
    </IsOpenContextProvider>
  );
}
