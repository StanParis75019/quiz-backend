import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { LoginDto } from "./dto/login.dto";
import { Userservice } from "./user.service";
import { RegisterDto } from "./dto/createuser.dto";


@Controller("user")

export class UserController {
    constructor(private readonly userservice: Userservice){}
    @Post("/login")
    async login(@Body() {email,password}: LoginDto )
    {
        return await this.userservice.login(email,password);
    }
    @Post("/register")
    async register(@Body() data: RegisterDto){
        return await this.userservice.signup(data);
    }
    @Get("/getalluser")
    async getAllAdmin(){
        return await this.userservice.getAllUser();
    }
    @Delete('/deleteuser/:id')
    async deleteuser(@Param('id') id:number){
        return await this.userservice.deleteuser(id)
    }
}

