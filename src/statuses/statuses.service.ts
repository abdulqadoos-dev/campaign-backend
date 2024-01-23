import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { Like } from "typeorm"


@Injectable()
export class StatusesService {

  constructor(@InjectRepository(Status) private statusesRepository: Repository<Status>) { }

  create(createStatusDto: CreateStatusDto) {
    return this.statusesRepository.save(createStatusDto);
  }

  findAll() {
    return this.statusesRepository.find();
  }

  async search(filters: any) {

    let newFilters = filters;

    if (filters.query) {
      newFilters = {
        ...filters,
        where: [
          { label: Like(`%${filters.query}%`) },
          { type: Like(`%${filters.query}%`) },
        ]
      }
      delete newFilters['query'];
    }


    const [records, total] = await this.statusesRepository.findAndCount({
      ...newFilters,
      order: { type: "DESC" },
      relations: {
        leads: true,
        companies: true,
        activities: true,
      }

    });
    return { records, total }

  }

  findByType(type: any) {
    return this.statusesRepository.find({ where: type })
  }

  findOne(id: number) {
    return this.statusesRepository.findOneBy({ id })
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    await this.statusesRepository.save( updateStatusDto);
    return this.statusesRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.statusesRepository.delete(id);
  }
}
