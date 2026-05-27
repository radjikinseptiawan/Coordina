export interface DataCenter {   
  id: string;
  comity_name: string;
  comity_short_name: string;
  comity_area_of_operational: string;
  comity_city_of_operational: string;
  comity_icon: string;
  comity_created_date: string; // Bisa gunakan string untuk format ISO date "YYYY-MM-DD"
  comity_background: string;
  urlLink: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}
export interface ComityData {
    data : DataCenter
    vision: ComityVision,
    mission: ComityMission[]
}

export interface ComityVision{
    vision : string
}

export interface ComityMission{
    mission: string;
}