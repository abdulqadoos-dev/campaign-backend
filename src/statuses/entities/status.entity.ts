import { Activity } from "src/activity/entities/activity.entity";
import { Company } from "src/companies/entities/company.entity";
import { Email } from "src/emails/entities/email.entity";


import { Lead } from "src/leads/entities/lead.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity({ name: 'statuses' })
export class Status {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  value: string;

  @Column()
  colour: string;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Lead, (lead) => lead.statuses)
  leads: Lead[]

  @ManyToMany(() => Company, (company) => company.statuses)
  companies: Company[]

  @ManyToMany(() => Activity, (activity) => activity.statuses)
  activities: Activity[]

  @ManyToMany(() => Email, (email) => email.statuses)
  emails: Email[]

}
