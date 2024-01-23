import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from "typeorm"

@Injectable()
export class ActivityService {


  constructor(@InjectRepository(Activity) private activitiesRepository: Repository<Activity>) { }

  create(createActivityDto: CreateActivityDto) {
    return this.activitiesRepository.save(createActivityDto);
  }

  findAll() {
    return this.activitiesRepository.find();
  }


  async search(filters: any) {

    let newFilters = filters;

    if (filters.query) {
      newFilters = {
        ...filters, where: [
          { name: Like(`%${filters.query}%`) },
        ]
      }
      delete newFilters['query'];
    }

    if (filters.query && filters?.statuses?.value) {
      newFilters = {
        ...filters, where: [
          { name: Like(`%${filters.query}%`), statuses: { value: filters.statuses.value } },
        ]
      }
      delete newFilters['query'];
      delete newFilters['statuses'];
    }

    const [records, total] = await this.activitiesRepository.findAndCount({
      ...newFilters, relations: {
        statuses: true,
      },
    });
    return { records, total }

  }



  findOne(id: number) {
    return this.activitiesRepository.findOneBy({ id })
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    await this.activitiesRepository.save(updateActivityDto);
    return this.activitiesRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.activitiesRepository.delete(id);
  }
}
