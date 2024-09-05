import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Adminservice } from "./admin.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/createadmin.dto";

@Controller("auth")

export class AuthController {
    constructor(private readonly authservice: Adminservice){}
    @Post("/login")
    async login(@Body() {email,password}: LoginDto )
    {
        return await this.authservice.login(email,password);
    }
    @Post("/register")
    async register(@Body() data: RegisterDto){
        return await this.authservice.signup(data);
    }
    @Get("/getalladmins")
    async getAllAdmin(){
        return await this.authservice.getAllAdmin();
    }
    @Delete('/deleteadmin/:id')
    async deleteadmin(@Param('id') id:number){
        return await this.authservice.deleteadmin(id)
    }
}

