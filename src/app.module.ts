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
import { EmailsModule } from './emails/emails.module';
import { Email } from './emails/entities/email.entity';
import { ConversationModule } from './conversation/conversation.module';
import { Conversation } from './conversation/entities/conversation.entity';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Campaign, Lead, Company, Status, Activity, Email, Conversation],
      synchronize: process.env.SYNC_DATABASE === "true",
    }),

    AuthModule, UsersModule, CampaignsModule, LeadsModule, CompaniesModule, StatusesModule, ActivityModule, EmailsModule, ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
