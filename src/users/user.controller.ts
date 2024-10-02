// src/user/user.controller.ts
import { Controller, Post, Patch, Body, Param, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/createuser.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserProfileDto } from './dto/updateUserProfile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() createUserDto: RegisterDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.userService.login(loginUserDto);
  }

  @Patch(':id/score')
  updateScore(@Param('id') id: number, @Body('additionalScore') additionalScore: number) {
    return this.userService.updateScore(id, additionalScore);
  }

  @Patch('update/:id')
  // Route for updating user profile
  updateProfile(@Param('id') id: number, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userService.updateUserProfile(id, updateUserProfileDto);
  }

  @Get('/all')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Delete('/:id')
  async deleteuser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
  @Post(':userId/quizzes/:quizId/play')
  async playQuiz(
    @Param('userId') userId: number,
    @Param('quizId') quizId: number,
    @Body('response') response: string,
  ) {
    return this.userService.playQuiz(userId, quizId, response);
  }

  @Get(':userId/played-quizzes')
  async getPlayedQuizzes(@Param('userId') userId: number) {
    return this.userService.getPlayedQuizzes(userId);
  }
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return this.userService.getUserProfile(id);
  }
}
