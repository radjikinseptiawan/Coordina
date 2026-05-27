"use client";
import Link from "next/link";
import { useAuthLoginForms } from "../al.hooks/al.hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import {
  loginGoogleUser,
  loginGoogleUserPhone,
  loginUser,
} from "@/service/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthLoginForms() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthLoginForms();
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
    try {
      await loginUser(data);
      toast.success("Successfully to login!, redirect to dashboard");
      router.push("/dashboard");
    } catch (e: any) {
      console.log(e);
      toast.error(
        `${e.response.data?.message || "Something error, try again"}`,
      );
    }
  };

  const loginGoogle = async () => {
    if (width > 800) {
      const user: any = await loginGoogleUser();
      if (user) {
        toast.success(`Sucessfully to login, redirected to dashboard`);
        router.push("/dashboard");
      }
    } else {
      toast.success(`Sucessfully to login, redirected to dashboard`);
      await loginGoogleUserPhone();
    }
  };

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Card className="px-2 py-4 w-xl text-xl md:text-3xl text-center">
        <h1>Login</h1>
        <div className="flex justify-center">
          <Image src={"/coordina.png"} width={50} height={50} alt="coordina" />
        </div>
        <p className="text-sm">
          Let`s Build and manage your comunity more efficient with us!
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

          <div className="text-start flex flex-col">
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
            <Link href={"/forgot-password"} className="text-sm hover:">
              Lupa Password
            </Link>
          </div>
          <Button type="submit" className="w-60">
            login
          </Button>
          <Button
            type="button"
            onClick={loginGoogle}
            className="w-60"
            variant={"outline"}
          >
            <FaGoogle /> Sign In with Google
          </Button>
          <Link className="text-sm" href={"register"}>
            Don`t have an account? click here
          </Link>
        </form>
      </Card>
    </div>
  );
}
