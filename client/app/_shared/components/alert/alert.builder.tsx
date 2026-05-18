import { Button, Flex } from "@radix-ui/themes";
import { AlertDialog } from "radix-ui";

export function AlertFullNameisEmpty(){
    return (
        <AlertDialog.Root>
            <AlertDialog.Content>
                <AlertDialog.Title>Profile Kamu Belum Lengkap!</AlertDialog.Title>
                <AlertDialog.Description>
                    Beberapa layanan kami membutuhkan isi profile yang lengkap, lengkapi profile mu
                    terlebih dahulu untuk mendapatkan akses lebih dari layanan kami.
                </AlertDialog.Description>
                <Flex>
                    <Button>Lengkapi</Button>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}