"use client";
import Link from "next/link";
import { useAuthRegisterForms } from "../ar.hooks/ar.hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axios from "axios";
import { registerUser } from "@/service/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AuthRegisterForms() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthRegisterForms();

  const submitForm = async (data: any) => {
    const result = await registerUser(data);
    if (!result) {
      toast.error(`${errors.form}`);
    }
    toast.success("Successfully to registered account!, redirect to login...");
    route.push("/login");
  };

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Card className="px-2 py-4 w-xl text-xl md:text-3xl text-center">
        <h1>Register</h1>
        <div className="flex justify-center">
          <Image src={"/coordina.png"} width={50} height={50} alt="coordina" />
        </div>
        <p className="text-sm">Fill the field for register your accounts</p>
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

          <div className="text-start">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              {...register("username")}
              className="border w-72 md:w-90"
            />
            {errors.username && (
              <p className="text-[12px] text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="text-start">
            <Label htmlFor="Password">Password</Label>
            <Input
              type="password"
              {...register("password")}
              className="border w-72 md:w-90"
            />
            {errors.password && (
              <p className="text-[12px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-start">
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

          <Button>Register</Button>
          <Link className="text-sm" href={"/login"}>
            Already have an account? go to Login
          </Link>
        </form>
      </Card>
    </div>
  );
}
