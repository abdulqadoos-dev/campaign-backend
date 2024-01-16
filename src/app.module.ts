import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { User } from './entities/user.entity';
import { Lead } from './leads/entities/lead.entity';
import { Campaign } from './campaigns/entities/campaign.entity';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';
import { StatusesModule } from './statuses/statuses.module';

import { Status } from './statuses/entities/status.entity';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/entities/activity.entity';



console.log(process.env.DB_SYNC === "true",)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Campaign, Lead, Company, Status, Activity],
      synchronize: process.env.DB_SYNC === "true",
    }),

    AuthModule, UsersModule, CampaignsModule, LeadsModule, CompaniesModule, StatusesModule, ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  constructor(private dataSource: DataSource) { }
}
