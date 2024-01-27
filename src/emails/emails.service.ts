import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { Repository } from 'typeorm';
import { Like } from "typeorm"



@Injectable()
export class EmailsService {

  constructor(@InjectRepository(Email) private emailsRepository: Repository<Email>) { }

  create(createEmailDto: CreateEmailDto) {
    return this.emailsRepository.save(createEmailDto);
  }

  findAll() {
    return this.emailsRepository.find();
  }

  async search(filters: any) {

    let newFilters = filters;

    if (filters.query) {
      newFilters = {
        ...filters,
        where: [
          { name: Like(`%${filters.query}%`) },
          { subject: Like(`%${filters.query}%`) },
          { notes: Like(`%${filters.query}%`) },
        ]
      }
      delete newFilters['query'];
    }

    if (filters.query && filters?.statuses?.value) {
      newFilters = {
        ...filters, where: [
          { name: Like(`%${filters.query}%`), statuses: { value: filters.statuses.value } },
          { subject: Like(`%${filters.query}%`), statuses: { value: filters.statuses.value } },
          { notes: Like(`%${filters.query}%`), statuses: { value: filters.statuses.value } },
        ]
      }
      delete newFilters['query'];
      delete newFilters['statuses'];
    }


    const [records, total] = await this.emailsRepository.findAndCount({
      ...newFilters,
      order: { id: "DESC" },
      relations: {
        statuses: true,
      }
    });
    return { records, total }

  }


  findOne(id: number) {
    return this.emailsRepository.findOneBy({ id });
  }

  async update(id: number, updateEmailDto: UpdateEmailDto) {
    await this.emailsRepository.save(updateEmailDto);
    return this.emailsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.emailsRepository.delete(id);
  }
}
