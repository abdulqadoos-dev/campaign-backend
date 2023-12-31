import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignsService {

  constructor(@InjectRepository(Campaign) private campaignsRepository: Repository<Campaign>) { }

  create(createCampaignDto: CreateCampaignDto) {
    return this.campaignsRepository.save(createCampaignDto);
  }

  findAll() {
    return this.campaignsRepository.find();
  }

  findOne(id: number) {
    return this.campaignsRepository.findOneBy({ id })
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    await this.campaignsRepository.update(id, updateCampaignDto);
    return this.campaignsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.campaignsRepository.delete(id);
  }
}
