import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/createuser.dto';
import { UpdateUserProfileDto } from './dto/updateUserProfile.dto';
import { Quiz } from 'src/quiz/Quiz.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,  // Inject Quiz repository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['quizzes'],  // Include quizzes played by the user
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async signup(createUserDto: RegisterDto): Promise<User> {
    const { username, email, password, firstName, lastName } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new BadRequestException('Username or email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      score: 0,
    });

    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { userId: user.id, username: user.username };
    const accessToken = jwt.sign(payload, 'yourJwtSecretKey', { expiresIn: '1h' });

    return user;
  }

  // New method to handle quiz response
  async playQuiz(userId: number, quizId: number, selectedResponse: string): Promise<User> {
    const user = await this.findOne(userId);
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Check if the user has already played this quiz
    if (user.quizzes.some((playedQuiz) => playedQuiz.id === quizId)) {
      throw new BadRequestException('This quiz has already been played by the user.');
    }

    // If the user's selected response is correct, add 10 points to their score
    if (selectedResponse === quiz.response) {
      user.score += 10;
    }

    // Add this quiz to the list of quizzes played by the user
    user.quizzes.push(quiz);

    return this.userRepository.save(user);
  }

  async updateScore(userId: number, additionalScore: number): Promise<User> {
    const user = await this.findOne(userId);
    user.score += additionalScore;
    return this.userRepository.save(user);
  }

  async updateUserProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto): Promise<User> {
    const { username, email, firstName, lastName, password } = updateUserProfileDto;

    const user = await this.findOne(userId);

    // Update user data
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    // Update password if provided and ensure validation
    if (password) {
      const passwordValid = this.validatePassword(password);
      if (!passwordValid) {
        throw new BadRequestException('Password must contain 8 characters, 1 uppercase, 1 number, and 1 special character.');
      }
      user.password = await bcrypt.hash(password, 10);
    }

    return this.userRepository.save(user);
  }

  private validatePassword(password: string): boolean {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUppercase && hasNumber && hasSpecialChar;
  }
  async getUserProfile(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteUser(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
  async getPlayedQuizzes(userId: number): Promise<Quiz[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['quizzes'], // Ensure quizzes relation is loaded
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return the list of quizzes that the user has played
    return user.quizzes;
  }
}
