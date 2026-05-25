"use client";
import { MenuDashboardControllers } from "./md.controllers/controllers";
import { MenuDashboardCards } from "./md.components/md.cards";
import { useEffect, useState } from "react";
import { IsLoadingContextProvider, IsOpenContextProvider } from "./md.context";

export default function MenuDashboardTemplate() {
  return (
    <IsOpenContextProvider>
      <IsLoadingContextProvider>
        <div className="mx-4">
          <MenuDashboardControllers />
          <div className="grid grid-cols-1 md:grid-cols-4">
            <MenuDashboardCards />
          </div>
        </div>
      </IsLoadingContextProvider>
    </IsOpenContextProvider>
  );
}
