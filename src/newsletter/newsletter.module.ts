import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsletterEntity } from "./newsletter.entity";
import { NewsletterController } from "./newsletter.controller";
import { NewsLetterService } from "./newsletter.service";

@Module({
    imports:[TypeOrmModule.forFeature([NewsletterEntity])],
    controllers:[NewsletterController],
    providers:[NewsLetterService],
    exports:[]
})
export class NewsletterModule{}