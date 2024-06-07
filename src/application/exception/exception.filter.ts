import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        let msg = exception.getResponse()
        const ctx = host.switchToHttp()
        const resp = ctx.getResponse<Response>()
        let status = exception.getStatus()

        resp
            .status(status)
            .json({
                message: msg
            })
    }
}