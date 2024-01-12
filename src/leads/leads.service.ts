import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeadsService {

  constructor(@InjectRepository(Lead) private leadsRepository: Repository<Lead>) { }

  create(createLeadDto: CreateLeadDto) {
    return this.leadsRepository.save(createLeadDto);
  }

  findAll() {
    return this.leadsRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  findOne(id: number) {
    return this.leadsRepository.findOneBy({ id });
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    await this.leadsRepository.update(id, updateLeadDto);
    return this.leadsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.leadsRepository.delete(id);
  }

}
