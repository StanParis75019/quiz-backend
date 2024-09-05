import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Adminservice } from "./admin.service";
import { AuthController } from "./admin.controller";
import { Adminmiddleware } from "./Middleware/Admin.middleware";

@Module({
    controllers: [AuthController],
    providers: [Adminservice, Adminmiddleware],
    exports: [Adminservice],
    imports: [TypeOrmModule.forFeature([AdminEntity])],
})

export class AdminModule {}