import { Injectable, NestMiddleware, Next } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Adminservice } from "../admin.service";


interface Expressrequest extends Request {
    user? : any
}

@Injectable()
export class Adminmiddleware implements NestMiddleware{
constructor(
    private readonly adminservice:Adminservice
){}
    async use(req: Expressrequest, res: Response, next: NextFunction) {
        if (! req.headers.authorization){
            req.user = null
            next()
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decoded:any = verify(token, "clesecrete");
            if (decoded.role === "ADMIN"){
                const user = await this.adminservice.getmeasadmin(decoded?.id)
                req.user = user
            }
        } catch (error) {
            req.user = null;

        } 
        next()
    }
}