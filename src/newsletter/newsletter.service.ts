import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsletterEntity } from "./newsletter.entity";
import { Repository } from "typeorm";


@Injectable()

export class NewsLetterService {
    constructor (@InjectRepository(NewsletterEntity)private readonly newsletterrepo:Repository<NewsletterEntity>){}
    async createNewsletter(email:string){
        const newsletter = this.newsletterrepo.create({email})
        return await this.newsletterrepo.save(newsletter)
    } 
    async getAllNewsletters(){
        return await this.newsletterrepo.find()
    }
    async deletenewsletterbyid(newsletterid:number){
        const newsletter=await this.newsletterrepo.findOne({where:{id:newsletterid}})
        if (!newsletter)
        {
            throw new HttpException('No newsletter found', HttpStatus.NOT_FOUND)
        }
        return await this.newsletterrepo.remove (newsletter)
    }

}