import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { NewsLetterService } from "./newsletter.service";

@Controller('/newsletter')

export class NewsletterController {
    // Route pour enregistrer un email dans la newsletter
    constructor(private readonly newsletterService: NewsLetterService){}
    @Post("/create")
    async registerEmail(@Body() data: string) {
     return  await this.newsletterService.createNewsletter(data);
    
    }
    @Get("/getall")
    async getAllNewsletters() {
        return await this.newsletterService.getAllNewsletters();
    }
    
    @Delete("/delete/:id")
    async deleteNewsletter(@Param('id') id: number) {
        return await this.newsletterService.deletenewsletterbyid(id);
    }
}
