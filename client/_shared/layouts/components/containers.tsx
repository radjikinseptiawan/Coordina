import { ReactNode } from "react";

export default function Containers({
  title,
  description,
  children,
}: {
  title: string;
  description: String;
  children: ReactNode;
}) {
  return (
    <div className="mx-8 my-4">
      <h1 className="text-lg font-bold md:text-xl">{title}</h1>
      <p className="text-gray-400">{description}</p>
      <div className="my-4">{children}</div>
    </div>
  );
}
