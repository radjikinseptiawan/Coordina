import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AgendaPayload } from "../dto/agenda.dto";

@Injectable()
export class AgendaServices{
    constructor(
        private readonly prisma: PrismaService
    ){}

    async createAgenda(body : AgendaPayload, ComityId: string, createdById: string){
        try{
            const data = await this.prisma.agenda.create({
                data:{
                    agenda_name: body.agenda_name,
                    tanggal_agenda: body.tanggal_agenda,
                    is_online: body.is_online,
                    lokasi: body.lokasi,
                    status_agenda: body.status_agenda,
                    note: body.note,
                    lampiran: body.lampiran,
                    meetingLink: body.meetingLink,
                    created_by_id: createdById,                    
                    comity_id: ComityId,
                }
            })


            if(!data){
                return new HttpException({
                    message: "Unknwon Error!",
                    detail: "Failed to create agenda",
                    data
                }, HttpStatus.AMBIGUOUS)
            }

            return new HttpException({
                message: "Success to create agenda",
                detail: "agenda has been created!",
                data
            },HttpStatus.CREATED)

        }catch(e){
            throw new HttpException({
                message: e,
                error: e
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}