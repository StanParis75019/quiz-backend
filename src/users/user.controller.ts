// src/user/user.controller.ts
import { Controller, Post, Patch, Body, Param, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/createuser.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  // Route pour l'inscription d'un nouvel utilisateur
  signup(@Body() createUserDto: RegisterDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('login')
  // Route pour la connexion d'un utilisateur
  login(@Body() loginUserDto: LoginDto) {
    return this.userService.login(loginUserDto);
  }

  @Patch(':id/score')
  // Route pour mettre à jour le score de l'utilisateur après avoir terminé un quiz
  updateScore(@Param('id') id: number, @Body('additionalScore') additionalScore: number) {
    return this.userService.updateScore(id, additionalScore);
  }

  @Get('/all')
  // Route pour récupérer tous les utilisateurs
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Delete('/:id')
  // Route pour supprimer un utilisateur par son identifiant
  async deleteuser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
