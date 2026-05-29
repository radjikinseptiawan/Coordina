"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useResetPasswordForm } from "../arp.hooks/arp.hooks";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { resetUserPassword } from "@/service/dashboard/auth.service";
import { toast } from "sonner";

export function AuthResetPasswordForm() {
  const email = useSearchParams().get("email");
  const route = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useResetPasswordForm();

  const submitForm = async (data: any) => {
    const payload = {
      email: email,
      otp: data.otp,
      newPassword: data.otp,
    };

    const result = await resetUserPassword(payload);

    if (!result) {
      toast.error(`${errors.form}`);
      return;
    }

    toast.success(`Success reset password!, redirect to login...`);
    route.push("/login");
  };
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Card className="px-2 py-4 w-xl text-xl md:text-3xl text-center">
        <h1>Reset Password</h1>
        <p className="text-sm">
          Enter the OTP code we sent to your email and create a new password
        </p>
        <form
          method="POST"
          className="flex flex-col my-2 justify-center items-center gap-2"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="text-start">
            <Label htmlFor="password">Verification Code</Label>
            <InputOTP
              onChange={(e) => {
                setValue("otp", e);
              }}
              maxLength={4}
            >
              <InputOTPSlot index={0} />
              <InputOTPSeparator />
              <InputOTPSlot index={1} />
              <InputOTPSeparator />
              <InputOTPSlot index={2} />
              <InputOTPSeparator />
              <InputOTPSlot index={3} />
            </InputOTP>
            {errors.otp && (
              <p className="text-[12px] text-red-500">{errors.otp.message}</p>
            )}
          </div>

          <div className="text-start">
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              className="border w-72 md:w-90"
            />
            {errors.password && (
              <p className="text-[12px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-start flex flex-col">
            <Label htmlFor="Password">Confirm Password</Label>
            <Input
              type="password"
              {...register("confirmPassword")}
              className="border w-72 md:w-90"
            />
            {errors.confirmPassword && (
              <p className="text-[12px] text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-60">
            Reset Password
          </Button>
          <Link className="text-sm" href={"login"}>
            Back to login
          </Link>
        </form>
      </Card>
    </div>
  );
}
