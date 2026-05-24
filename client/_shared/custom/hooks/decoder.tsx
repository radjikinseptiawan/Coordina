import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const decoderToken = async () => {
  const tokens = await cookies();
  const token = await tokens.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decode = jwt.decode(token);
  return decode;
};
