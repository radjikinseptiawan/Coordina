"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Save, Upload, Trash2, Building2, AlertTriangle } from "lucide-react";

export default function SettingOrganizations() {
  // State manajemen gambar pratinjau (preview icon)
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kirim perubahan data organisasi ke NestJS...");
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header Halaman */}
      <form
        onSubmit={handleSaveSettings}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* KOLOM KIRI: Manajemen Icon/Logo */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">
                Organization Icon
              </CardTitle>
              <CardDescription>Update your organization logo.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 pt-2">
              {/* Lingkaran Avatar Logo */}
              <Avatar className="h-32 w-32 border-2 border-gray-100 shadow-sm">
                {iconPreview ? (
                  <AvatarImage
                    src={iconPreview}
                    alt="Organization Logo"
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gray-50 text-gray-400">
                    <Building2 className="h-12 w-12 stroke-[1.5]" />
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Tombol Upload Hidden Trigger */}
              <div className="w-full">
                <Label
                  htmlFor="icon-upload"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium border border-gray-200 rounded-md shadow-xs bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 text-gray-500" />
                  Choose File
                </Label>
                <Input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleIconChange}
                />
              </div>
              <p className="text-[11px] text-center text-muted-foreground">
                Allowed JPG, PNG. Max size of 2MB
              </p>
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN: Form Profil Teks (Visi, Misi, Latar Belakang) */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Profile Information
              </CardTitle>
              <CardDescription>
                Configure the core identity details of your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Input Nama Organisasi */}
              <div className="space-y-1">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  defaultValue="HIMATIF UPB"
                  placeholder="Masukkan nama organisasi"
                />
              </div>

              {/* Textarea Latar Belakang */}
              <div className="space-y-1">
                <Label htmlFor="background">Latar Belakang (Background)</Label>
                <Textarea
                  id="background"
                  placeholder="Ceritakan sejarah singkat atau latar belakang berdirinya organisasi..."
                  className="min-h-[100px] resize-y"
                />
              </div>

              {/* Textarea Visi */}
              <div className="space-y-1">
                <Label htmlFor="vision">Visi (Vision)</Label>
                <Textarea
                  id="vision"
                  placeholder="Tuliskan visi utama organisasi..."
                  className="min-h-[80px] resize-y"
                />
              </div>

              {/* Textarea Misi */}
              <div className="space-y-1">
                <Label htmlFor="mission">Misi (Mission)</Label>
                <Textarea
                  id="mission"
                  placeholder="Tuliskan poin-poin misi (gunakan baris baru untuk tiap poin)..."
                  className="min-h-[120px] resize-y"
                />
              </div>

              {/* Tombol Simpan Profil */}
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* DANGER ZONE: Tombol Delete (Gak mencolok tapi aman) */}
          <Card className="border-red-100 bg-red-50/40 shadow-none">
            <CardHeader className="p-4 flex flex-row items-center gap-3 space-y-0">
              <div className="p-2 bg-red-100 rounded-lg text-red-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-red-950">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-xs text-red-700/80">
                  Irreversible actions for this organization data.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-gray-600 max-w-md">
                Deleting this organization will permanently remove all related
                members data, attendance recapitulations, and structures.
              </p>
              <Button
                type="button"
                variant="destructive"
                className="bg-red-600 text-white hover:bg-red-700 text-xs py-1.5 h-auto flex items-center gap-1.5 self-start sm:self-center"
                onClick={() => alert("Konfirmasi hapus organisasi!")}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Organization
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
