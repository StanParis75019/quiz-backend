import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/createuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    // Injection du repository de l'entité 'User' pour interagir avec la base de données
    private readonly userRepository: Repository<User>,
  ) {}

  // Méthode pour récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Méthode pour récupérer un utilisateur par son identifiant
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      // Lance une exception si l'utilisateur n'est pas trouvé
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Méthode pour inscrire un nouvel utilisateur
  async signup(createUserDto: RegisterDto): Promise<User> {
    const { username, email, password, firstName, lastName } = createUserDto;

    // Vérifie si l'email ou le nom d'utilisateur est déjà enregistré
    const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new BadRequestException('Username or email is already taken');
    }

    // Hache le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      score: 0, // Initialise le score à 0
    });

    return this.userRepository.save(user);
  }

  // Méthode pour connecter un utilisateur
  async login(loginUserDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Lance une exception si l'email n'est pas valide
      throw new UnauthorizedException('Invalid email or password');
    }

    // Vérifie si le mot de passe est valide
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Lance une exception si le mot de passe n'est pas valide
      throw new UnauthorizedException('Invalid email or password');
    }

    // Génère un jeton JWT avec jsonwebtoken
    const payload = { userId: user.id, username: user.username };
    const accessToken = jwt.sign(payload, 'yourJwtSecretKey', { expiresIn: '1h' }); // Remplacez par votre clé secrète

    return { accessToken };
  }

  // Méthode pour mettre à jour le score de l'utilisateur lorsqu'il termine un quiz
  async updateScore(userId: number, additionalScore: number): Promise<User> {
    const user = await this.findOne(userId);
    user.score += additionalScore;
    return this.userRepository.save(user);
  }

  // Méthode pour supprimer un utilisateur par son identifiant
  async deleteUser(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
