import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'leads' })
export class Lead {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  url: string;

  @Column()
  company: string;

  @Column()
  status: string;

  @Column()
  notes: string;

  @Column()
  companyUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.lead)
  campaign: Campaign

}
