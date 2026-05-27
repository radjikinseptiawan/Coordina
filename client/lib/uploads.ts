"use server"
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

export async function uploadFile(formData : any){
    try{
    const file = formData.get("image");
    if(!file) return { error: "there is not file!"}

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await new Promise<UploadApiResponse>((resolve, reject)=>{
        const stream = cloudinary.uploader.upload_stream({folder: "Coordina"},(error,result)=>{
            if(error) reject(error)
        
            if (result) {
                resolve(result as UploadApiResponse);
            } else {
                reject(new Error("Upload failed with empty result"));
            }

            })
        stream.end(buffer)
    })
    return { success: true, url : result.secure_url }
    }catch(e){
        return { error: e }
    }
}