import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { User } from './entities/user.entity';
import { Lead } from './leads/entities/lead.entity';
import { Campaign } from './campaigns/entities/campaign.entity';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { CampaignsModule } from './campaigns/campaigns.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'campaigns',
      entities: [User, Campaign, Lead],
      synchronize: false,
    }),
    AuthModule, UsersModule, CampaignsModule, LeadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { 
  constructor(private dataSource: DataSource) {}
}
