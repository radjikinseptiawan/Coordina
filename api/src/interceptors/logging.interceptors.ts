import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable()
export class LogginInterceptors implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> | any {
        const controllers = context.getClass().name
        const handler = context.getHandler().name

        console.log(`Memasuki ${controllers} - ${handler} ....`)

        const now = Date.now()

        return next.handle().pipe(
            tap(()=>{
            console.log(`[${Date.now() - now}ms] Berhasil mengakses controller ${controllers}, handler ${handler}`)
        }),
        catchError((err) : any=>{
            console.error(`
            [${Date.now() - now}ms] Error di ${controllers} pada ${handler}`, err.message || err)
            return throwError(()=>err)
        })
    )

    }
}