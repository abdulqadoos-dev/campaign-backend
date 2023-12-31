import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaign: Campaign[]
  
}