import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Adminservice } from "./admin.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/createadmin.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authservice: Adminservice) {}

    @Post("/login")
    // Route pour gérer la connexion d'un administrateur
    async login(@Body() {email, password}: LoginDto) {
        return await this.authservice.login(email, password);
    }

    @Post("/register")
    // Route pour enregistrer un nouvel administrateur
    async register(@Body() data: RegisterDto) {
        return await this.authservice.signup(data);
    }

    @Get("/getalladmins")
    // Route pour récupérer la liste de tous les administrateurs
    async getAllAdmin() {
        return await this.authservice.getAllAdmin();
    }

    @Delete('/deleteadmin/:id')
    // Route pour supprimer un administrateur en utilisant son identifiant
    async deleteadmin(@Param('id') id: number) {
        return await this.authservice.deleteadmin(id);
    }

    @Put('updateProfile')
    // Route pour mettre à jour le profil d'un administrateur
    async updateProfile(@Body() updateProfileDto: any) {
        return this.authservice.updateProfile(updateProfileDto);
    }
}
