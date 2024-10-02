import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Adminservice } from "./admin.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/createadmin.dto";
import { UpdateAdminProfileDto } from "./dto/UpdateAdminProfile.dto";

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

   
  @Put('update/:id')
  // Route to update admin profile
  async updateProfile(@Body() updateProfileDto: UpdateAdminProfileDto) {
    return this.authservice.updateProfile(updateProfileDto);
  }
}
