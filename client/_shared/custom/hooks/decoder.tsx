import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const decoderToken = async () => {
  const tokens = await cookies();
  const token = await tokens.get("access_token")?.value;

  if (!token || token === undefined) {
    redirect("/login");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    return decode;
  } catch (e) {
    redirect("/login");
  }
};
