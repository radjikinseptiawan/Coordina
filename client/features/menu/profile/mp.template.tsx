"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useRef, useState } from "react";
import MenuProfileControllers from "./mp.controllers/mp.controllers";
import { useSearchParams } from "next/navigation";
import MenuProfileForms from "./mp.forms/mp.forms";
import MenuProfileInfoComponents from "./mp.components/mp.info";

export default function MenuProfileTemplate() {
  const edit = useSearchParams().get("edit")
  return (
    <>
    <MenuProfileControllers/>    
    {edit ? (<MenuProfileForms />) : (<MenuProfileInfoComponents/>) }
    </>
  );
}
