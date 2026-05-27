"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MenuDashboardAddDialogs from "../md.dialogs/add.dialogs";
import { useOpenContext } from "../md.context";

export function MenuDashboardControllers() {
  const { setIsOpen } = useOpenContext();
  return (
    <div className="flex px-8 justify-between py-1 border-b-2 flex-col md:flex-row">
      <div>
        <h1 className="text-[18px] md:text-3xl font-semibold">Dashboard</h1>
        <p className="text-[14px] md:text-md mb-4 text-muted-foreground">
          Welcome back! Manage your organizations with ease.
        </p>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant={"outline"}>Cari Organisasi</Button>
        <Button onClick={() => setIsOpen(true)}>Create Organization</Button>
      </div>

      <MenuDashboardAddDialogs onClose={() => setIsOpen(false)} />
    </div>
  );
}
