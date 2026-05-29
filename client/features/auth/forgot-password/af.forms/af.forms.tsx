"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { forgotUserPassword } from "@/service/dashboard/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { useAuthResetPasswordForm } from "../af.hooks/af.hooks";

export function AuthForgotForms() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthResetPasswordForm();
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const deviceWidth = () => {
      setWidth(window.innerWidth);
    };

    deviceWidth();
    window.addEventListener("resize", deviceWidth);

    console.log(width);
    return () => window.removeEventListener("resize", deviceWidth);
  }, [width]);

  const submitForm = async (data: any) => {
    const result = await forgotUserPassword(data);
    if (!result) {
      return toast.error(`${errors.form}`);
    }
    toast.success("We already send otp code to your email, let`s check it!");
    router.push(`/reset-password?email=${data.email}`);
  };

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Card className="px-2 py-4 w-xl text-xl md:text-3xl text-center">
        <h1>Reset your password</h1>
        <p className="text-sm">
          We’ll send a password reset code to your email.
        </p>
        <form
          method="POST"
          className="flex flex-col my-2 justify-center items-center gap-2"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="text-start">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className="border w-72 md:w-90"
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-60">
            <Plane /> Continue
          </Button>
          <Link className="text-sm" href={"login"}>
            Back to login
          </Link>
        </form>
      </Card>
    </div>
  );
}
