// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { MessageService } from './messages.service';
import { MessageController } from './messages.controlleur';

@Module({
  // Importe le module TypeOrmModule avec l'entité Message pour permettre les opérations sur la base de données
  imports: [TypeOrmModule.forFeature([Message])],
  
  // Spécifie le service 'MessageService' comme fournisseur dans ce module
  providers: [MessageService],
  
  // Spécifie le contrôleur 'MessageController' pour gérer les routes liées aux messages
  controllers: [MessageController],
})
export class MessageModule {}
