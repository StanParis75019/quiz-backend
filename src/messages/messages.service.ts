// src/message/message.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './Dto/CreateMessage.dto';
import { Message } from './messages.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    // Injection du repository de l'entité 'Message' pour interagir avec la base de données
    private readonly messageRepository: Repository<Message>,
  ) {}

  // Méthode pour récupérer tous les messages
  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  // Méthode pour récupérer un message par son identifiant
  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      // Lance une exception si le message n'est pas trouvé
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  // Méthode pour créer un nouveau message
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { senderName, email, messageBody } = createMessageDto;

    // Crée une nouvelle instance de 'Message' avec les données du DTO
    const message = this.messageRepository.create({
      senderName,
      email,
      messageBody,
    });

    // Enregistre le message dans la base de données
    return this.messageRepository.save(message);
  }

  // Méthode pour supprimer un message par son identifiant
  async remove(id: number): Promise<void> {
    const message = await this.findOne(id); // Récupère le message à supprimer
    await this.messageRepository.remove(message); // Supprime le message de la base de données
  }
}
