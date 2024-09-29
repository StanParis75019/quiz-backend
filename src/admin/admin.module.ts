import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Adminservice } from "./admin.service";
import { AuthController } from "./admin.controller";
import { Adminmiddleware } from "./Middleware/Admin.middleware";

@Module({
    // Spécifie les contrôleurs associés à ce module
    controllers: [AuthController],
    
    // Spécifie les fournisseurs (services et middlewares) disponibles dans ce module
    providers: [Adminservice, Adminmiddleware],
    
    // Exporte le service Adminservice pour qu'il puisse être utilisé dans d'autres modules
    exports: [Adminservice],
    
    // Importe le module TypeOrmModule avec l'entité AdminEntity pour la gestion des opérations sur la base de données
    imports: [TypeOrmModule.forFeature([AdminEntity])],
})
export class AdminModule {}
