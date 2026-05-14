import { useLoading } from "@/app/_shared/common/context/loading.context"
import { serverUrl } from "@/utils/connection"
import { Button } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { FcGoogle } from "react-icons/fc"

export default function GoogleMethod() {
    const router = useRouter()
    const { isLoading, setLoading } = useLoading()

    const loginWithGoogle = async () => {
        try {
            setLoading(true)

            const popup = window.open(`${serverUrl}/auth/google/`, "GoogleLogin", "width=600,height=600")

            setInterval(() => {
                if (popup?.closed) {
                    setLoading(false)
                    clearInterval(200)
                }
            }, 300)

        } catch (e) {
            setLoading(false)
            console.error(e)
        }
    }


    useEffect(() => {
        const helperLogin = (event: MessageEvent) => {
            if (event.data.status === "ok") {
                router.push("/dashboard")
            }
        }

        window.addEventListener("message", helperLogin)

        return () => window.removeEventListener("message", helperLogin)
    })
    return (
        <Button type="button" color="ruby" disabled={isLoading} onClick={loginWithGoogle} variant="surface" >
            {isLoading ? "loading..." : <><FcGoogle /> Login dengan google</>}
        </Button>
    )
}