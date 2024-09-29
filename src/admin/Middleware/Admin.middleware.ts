import { Injectable, NestMiddleware, Next } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Adminservice } from "../admin.service";

interface Expressrequest extends Request {
    user?: any;
}

@Injectable()
export class Adminmiddleware implements NestMiddleware {
    constructor(
        private readonly adminservice: Adminservice
    ) {}

    async use(req: Expressrequest, res: Response, next: NextFunction) {
        // Vérifie si le champ 'authorization' est présent dans les en-têtes de la requête
        if (!req.headers.authorization) {
            req.user = null; // Si non, assigne 'null' à 'req.user'
            next(); // Passe au middleware suivant
            return;
        }

        // Récupère le token à partir de l'en-tête 'authorization'
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Vérifie et décode le token avec la clé secrète
            const decoded: any = verify(token, "clesecrete");

            // Vérifie si le rôle de l'utilisateur décodé est 'ADMIN'
            if (decoded.role === "ADMIN") {
                // Récupère les informations de l'admin à partir du service et les assigne à 'req.user'
                const user = await this.adminservice.getmeasadmin(decoded?.id);
                req.user = user;
            }
        } catch (error) {
            req.user = null; // En cas d'erreur, assigne 'null' à 'req.user'
        }

        next(); // Passe au middleware suivant
    }
}
