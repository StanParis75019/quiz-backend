// src/message/message.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MessageService } from './messages.service';
import { CreateMessageDto } from './Dto/CreateMessage.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  // Route pour récupérer tous les messages
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  // Route pour récupérer un message spécifique par son identifiant
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Post()
  // Route pour créer un nouveau message
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Delete(':id')
  // Route pour supprimer un message par son identifiant
  remove(@Param('id') id: number) {
    return this.messageService.remove(id);
  }
}
