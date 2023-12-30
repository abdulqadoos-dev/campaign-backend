import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaign } from './campaigns/entities/campaign.entity';

@Module({
  imports: [AuthModule, UsersModule, CampaignsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'email',
      entities: [User, Campaign],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { 
  constructor(private dataSource: DataSource) {}
}
