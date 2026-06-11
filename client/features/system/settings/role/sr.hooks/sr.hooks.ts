import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormRoleBasedAccessSchema } from "../sr.form/sr.schema";

export const useSystemRoleForm = () => {
  return useForm({
    resolver: zodResolver(FormRoleBasedAccessSchema),
    defaultValues: {
      roleName: "",
      permissions: {},
    },
  });
};
