import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ConversationService {

  constructor(@InjectRepository(Conversation) private conversationRepository: Repository<Conversation>) { }

  create(createConversationDto: CreateConversationDto) {
    return this.conversationRepository.save(createConversationDto)
  }

  findAll() {
    return this.conversationRepository.find();
  }

  findOne(id: number) {
    return this.conversationRepository.findOneBy({ id })
  }

  async update(id: number, updateConversationDto: UpdateConversationDto) {
    await this.conversationRepository.save(updateConversationDto);
    return this.conversationRepository.findOneBy({ id })
  }

  remove(id: number) {
    return this.conversationRepository.delete(id)
  }
}
