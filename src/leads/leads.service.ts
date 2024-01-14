import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';

import { Like } from "typeorm"


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
      skip: 0,
      take: 20,
    });
  }

  async search(filters: any) {

    let newFilters = filters;

    if (filters.query) {
      newFilters = {
        ...filters, where: [
          { firstName: Like(`%${filters.query}%`) },
          { lastName: Like(`%${filters.query}%`) },
          { designation: Like(`%${filters.query}%`) },
          { email: Like(`%${filters.query}%`) },
          { notes: Like(`%${filters.query}%`) },
        ]
      }
      delete newFilters['query'];
    }

    if (filters.query && filters.status) {
      newFilters = {
        ...filters, where: [
          { firstName: Like(`%${filters.query}%`), status: filters.status },
          { lastName: Like(`%${filters.query}%`), status: filters.status },
          { designation: Like(`%${filters.query}%`), status: filters.status },
          { email: Like(`%${filters.query}%`), status: filters.status },
          { notes: Like(`%${filters.query}%`), status: filters.status },
        ]
      }
      delete newFilters['query'];
      delete newFilters['status'];
    }

    const [records, total] = await this.leadsRepository.findAndCount(newFilters);
    return { records, total }

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
