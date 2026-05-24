import axios from "axios"
import { AuthBasicLoginPayload, AuthBasicRegisterPayload } from "./dto/auth.dto"

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta/auth`


export const loginUser = async (body: AuthBasicLoginPayload)=>{
    const response = await axios.post(`${BASE_API}/login`,body,{withCredentials:true})
    return response.data
}

export const loginGoogleUser = async() : Promise<void> =>{
    window.open(`${BASE_API}/oAuth/google`,"login","bottom=250, top=250, left=300, right=300")

    window.addEventListener('message',(event)=>{
        if(event.origin !== 'http://localhost:3000') return;
    })
}

export const loginGoogleUserPhone = async()=>{
    window.location.href = `${BASE_API}/oAuth/google`
}

export const registerUser = async(body: AuthBasicRegisterPayload)=>{
    const response = await axios.post(`${BASE_API}/register`,body,{withCredentials:true})
    return response.data
}

export const forgotUserPassword = async(body:any)=>{
    const response = await axios.get(`${BASE_API}/validate?email=${body.email}`)
    return response.data
}

export const resetUserPassword = async(body:any)=>{
    const response = await axios.post(`${BASE_API}/change-password?email=${body.email}&otp=${body.otp}`,body)
    return response.data
}