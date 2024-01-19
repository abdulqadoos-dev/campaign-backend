import { Activity } from "src/activity/entities/activity.entity";
import { Company } from "src/companies/entities/company.entity";
import { Lead } from "src/leads/entities/lead.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: 'statuses' })
export class Status {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column() 
  value: string;

  @Column({ nullable: true })
  style: string;

  @Column()
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Lead, (lead) => lead.status)
  leads: Lead[]

  @OneToMany(() => Company, (company) => company.status)
  companies: Company[]

  @OneToMany(() => Activity, (activity) => activity.status)
  activities: Activity[]

}
