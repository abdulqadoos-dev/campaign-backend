import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Like } from "typeorm"

@Injectable()
export class CompaniesService {


  constructor(@InjectRepository(Company) private companiesRepository: Repository<Company>) { }


  create(createCompanyDto: CreateCompanyDto) {
    return this.companiesRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companiesRepository.find({ order: { id: "DESC", }, skip: 0, take: 20, });
  }


  async search(filters: any) {

    let newFilters = filters;

    if (filters.query) {
      newFilters = {
        ...filters, where: [
          { name: Like(`%${filters.query}%`) },
          { country: Like(`%${filters.query}%`) },
          { type: Like(`%${filters.query}%`) },
          { email: Like(`%${filters.query}%`) },
          { notes: Like(`%${filters.query}%`) },
        ]
      }
      delete newFilters['query'];
    }

    if (filters.query && filters.status) {
      newFilters = {
        ...filters, where: [
          { name: Like(`%${filters.query}%`), status: filters.status },
          { country: Like(`%${filters.query}%`), status: filters.status },
          { type: Like(`%${filters.query}%`), status: filters.status },
          { email: Like(`%${filters.query}%`), status: filters.status },
          { notes: Like(`%${filters.query}%`), status: filters.status },
        ]
      }
      delete newFilters['query'];
      delete newFilters['status'];
    }

    const [records, total] = await this.companiesRepository.findAndCount(newFilters);
    return { records, total }

  }


  findOne(id: number) {
    return this.companiesRepository.findOneBy({ id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    await this.companiesRepository.update(id, updateCompanyDto);
    return this.companiesRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.companiesRepository.delete(id);
  }
}