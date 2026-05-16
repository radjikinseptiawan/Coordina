export const verificationMessage = (username: string, Otp: number) => {
    return `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; color: #333;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a73e8; margin-bottom: 10px; font-size: 24px;">Halo, ${username}!</h1>
        <div style="width: 50px; height: 4px; background-color: #1a73e8; margin: 0 auto; border-radius: 2px;"></div>
    </div>

    <div style="line-height: 1.6; font-size: 15px;">
        <p style="margin-bottom: 15px;">Kami mendeteksi adanya aktivitas yang memerlukan verifikasi tambahan pada akun kamu.</p>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0; border: 1px dashed #cbd5e0;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #718096; text-transform: uppercase; letter-spacing: 1px;">Kode OTP Kamu</p>
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: bold; color: #2d3748; letter-spacing: 5px;">${Otp}</span>
        </div>

        <p style="margin-bottom: 20px;">Silakan masukkan kode di atas untuk melanjutkan proses verifikasi.</p>
        
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #a0aec0; font-style: italic; text-align: center;">
            *Jika bukan kamu yang melakukan aktivitas tersebut, silakan abaikan pesan ini. Keamanan akun kamu adalah prioritas kami.
        </p>
    </div>

    <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #cbd5e0;">
        &copy; ${new Date().getFullYear()} Himatif Absency Team
    </div>
</div>`}

export const welcomingNewMember = (username: string) => {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 50px; margin-bottom: 10px;">🎉</div>
            <h1 style="color: #1a73e8; margin-bottom: 10px; font-size: 26px;">Selamat Datang, ${username}!</h1>
            <p style="color: #718096; font-size: 16px; margin: 0;">Kami senang kamu bergabung dengan kami.</p>
            <div style="width: 50px; height: 4px; background-color: #1a73e8; margin: 15px auto 0; border-radius: 2px;"></div>
        </div>

        <div style="line-height: 1.6; font-size: 15px;">
            <p style="margin-bottom: 15px;">Halo <strong>${username}</strong>, akun kamu telah berhasil terdaftar di sistem <strong>Himatif Absency</strong>.</p>
            
            <p style="margin-bottom: 15px;">Sekarang kamu bisa mulai menggunakan layanan kami untuk mempermudah pencatatan kehadiran dan memantau aktivitas organisasi dengan lebih efisien.</p>

            <div style="background-color: #ebf4ff; border-radius: 8px; padding: 15px; text-align: center; margin: 25px 0;">
                <p style="margin: 0; font-size: 14px; color: #2c5282;">
                    Silakan eksplorasi dashboard kamu dan lengkapi profil jika diperlukan.
                </p>
            </div>

            <p style="margin-bottom: 20px;">Jika kamu memiliki pertanyaan atau butuh bantuan, tim kami siap membantu kapan saja.</p>
            
            <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #a0aec0; text-align: center;">
                Pesan ini dikirim secara otomatis oleh sistem. Mohon untuk tidak membalas email ini.
            </p>
        </div>

        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #cbd5e0;">
            &copy; ${new Date().getFullYear()} Himatif Absency Team
        </div>
    </div>`;
}

export const googleAuth = (user: any) => (
    `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Berhasil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes scaleIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    </style>
</head>
<body class="bg-slate-50 flex items-center justify-center h-screen m-0 font-sans">
    <div class="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full mx-4 animate-scale">
        <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>

        <h1 class="text-2xl font-bold text-slate-800 mb-2">Login Berhasil!</h1>
        <p class="text-slate-500 text-sm mb-6">
            Halo <span class="font-semibold text-slate-700">${user.email}</span>, kamu berhasil masuk ke sistem.
        </p>
        
        <div class="flex items-center justify-center gap-2 text-slate-400 text-xs italic">
            <svg class="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menutup jendela otomatis...
        </div>
    </div>

    <script>
        if(window.opener){
        window.opener.postMessage({status:"ok"},"http://localhost:3000")
        
            setTimeout(()=>{
                window.close()
            },3000)
        }

    </script>
</body>
</html>
`)



// export const googleAuthFailed = (user: any) => (
//     `
// <!DOCTYPE html>
// <html lang="id">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Login Berhasil</title>
//     <script src="https://cdn.tailwindcss.com"></script>
//     <style>
//         @keyframes scaleIn {
//             0% { transform: scale(0); opacity: 0; }
//             100% { transform: scale(1); opacity: 1; }
//         }
//         .animate-scale { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
//     </style>
// </head>
// <body class="bg-slate-50 flex items-center justify-center h-screen m-0 font-sans">
//     <div class="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full mx-4 animate-scale">
//         <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
//             </svg>
//         </div>

//         <h1 class="text-2xl font-bold text-slate-800 mb-2">Login Gagal!</h1>
//         <p class="text-slate-500 text-sm mb-6">
//             Halo <span class="font-semibold text-slate-700">${user.email}</span>, kamu tidak terdaftar dalam sistem. silahkan daftarkan email terlebih dahulu
//         </p>

//         <div class="flex items-center justify-center gap-2 text-slate-400 text-xs italic">
//             <svg class="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                 <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Menutup jendela otomatis...
//         </div>
//     </div>

//     <script>
//         if(window.opener){
//         window.opener.postMessage({status:"ok"},"http://localhost:3000")

//             setTimeout(()=>{
//                 window.close()
//             },3000)
//         }

//     </script>
// </body>
// </html>
// `)

export const googleAuthFailed = (user: any) => (
    `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Gagal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes scaleIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    </style>
</head>
<body class="bg-slate-50 flex items-center justify-center h-screen m-0 font-sans text-slate-900">
    <div class="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-50 max-w-sm w-full mx-4 animate-scale">
        <div class="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>

        <h1 class="text-2xl font-bold text-red-600 mb-2">Akses Ditolak</h1>
        <p class="text-slate-500 text-sm mb-6 leading-relaxed">
            Maaf, email <span class="font-semibold text-slate-800">${user?.email || 'anda'}</span> belum terdaftar di sistem kami.
            <br><span class="block mt-2">Silakan hubungi admin atau daftar terlebih dahulu.</span>
        </p>
        
        <div class="flex items-center justify-center gap-2 text-slate-400 text-xs">
            <svg class="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menutup jendela secara otomatis...
        </div>
    </div>

    <script>
        // Kirim sinyal gagal ke parent window agar UI di app utama bisa bereaksi
        if(window.opener){
            window.opener.postMessage({
                status: "failed",
                message: "User not registered",
                email: "${user?.email || ''}"
            }, "http://localhost:3000");
        
            setTimeout(() => {
                window.close();
            }, 4000);
        } else {
            // Jika dibuka langsung tanpa popup, tetap beri jeda tutup
            setTimeout(() => {
                window.close();
            }, 5000);
        }
    </script>
</body>
</html>
`)