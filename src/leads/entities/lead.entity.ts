import { Stats } from "fs";
import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Company } from "src/companies/entities/company.entity";
import { Status } from "src/statuses/entities/status.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'leads' })
export class Lead {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.leads)
  campaign: Campaign

  @ManyToOne(() => Status, (status) => status.leads)
  status: Status

  @ManyToOne(() => Company, (company) => company.leads)
  company: Company

}
