import axios from "axios"

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta`


export const createOrganizations = async (body: any)=>{
    const payloadComity = {
        comity_name: body.organization_name,
        comity_short_name: body.short_name,
        comity_area_of_operational: body.area_operational,
        comity_city_of_operational: body.city_operational,
        comity_background: body.organization_background,
        comity_icon: body.organization_icon,
        comity_created_date: body.created_date
    }

    const comityResponse = await axios.post(`${BASE_API}/dashboard`,payloadComity,{withCredentials:true})

    const comityResults = comityResponse.data.response.data    
    
    const linkGenerated = `${comityResults.comity_short_name.toLowerCase().replace(/\s+/g,"")}-${comityResults.id.split("-")[0]}`

    const generateLinkPayload = {
        id: comityResults.id,
        urlLink: linkGenerated
    }
    const generateLink = await axios.put(`${BASE_API}/dashboard`,generateLinkPayload,{
        withCredentials: true
    })
    const linkResult = generateLink.data.response.data

    const visionPayload = {
        visi: body.organization_vision,
        id: comityResults.id   
    }

    const visionCreate = await axios.post(`${BASE_API}/${linkGenerated}/comity/vision`,visionPayload,{withCredentials:true})
    const visionResult = visionCreate.data.response.data

    const missionPayload = {
        mission: body.organization_mission,
        comity_id: comityResults.id
    }

    const missionCreate = await axios.post(`${BASE_API}/${linkGenerated}/comity/mission`,missionPayload,{withCredentials:true})
    const missionResult = missionCreate.data

    return {
        missionResult,
        visionResult,
        linkResult,
        comityResults
    }
}

export const getOrganizations = async()=>{
    const response = await axios.get(`${BASE_API}/dashboard/comities`,{withCredentials:true})
    const organizations = response.data.response.comities

    return organizations
}

export const getOrganizationsDetail = async(id: string)=>{
    const response = await axios.get(`${BASE_API}/${id}/comity`)
    return response.data.response
}