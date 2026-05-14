import LoadingProvider from "@/app/_shared/common/context/loading.context";
import { DashboardContextProvider } from "@/app/features/dashboard/da.context";

export default function ProtectedProvider({ children }: { children: React.ReactNode }) {
    return (
        <DashboardContextProvider>
            <LoadingProvider>
                {children}
            </LoadingProvider>
        </DashboardContextProvider>
    )
}