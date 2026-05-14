import axios from "axios"

export async function logoutHelper() {
    try {
        const response = await axios.delete("/api/auth/logout")

        if (response) {
            console.log("berhasil logout")
        }

    } catch (e) {
        console.error(e)
    }
}