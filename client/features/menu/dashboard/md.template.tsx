"use client";
import { MenuDashboardControllers } from "./md.controllers/controllers";
import { MenuDashboardCards } from "./md.components/md.cards";
import { useEffect, useState } from "react";
import {
  IsLoadingContextProvider,
  IsOpenContextProvider,
  MemoComityProvider,
} from "./md.context";
import MenuDashboardShowDialogs from "./md.dialogs/show.dialogs";

export default function MenuDashboardTemplate() {
  return (
    <IsOpenContextProvider>
      <IsLoadingContextProvider>
        <MemoComityProvider>
          <div className="mx-4">
            <MenuDashboardControllers />
            <div className="grid justify-items-center grid-cols-1 md:grid-cols-4">
              <MenuDashboardCards />
            </div>
          </div>
          <MenuDashboardShowDialogs />
        </MemoComityProvider>
      </IsLoadingContextProvider>
    </IsOpenContextProvider>
  );
}
