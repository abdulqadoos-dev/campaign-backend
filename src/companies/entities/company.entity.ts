import { Lead } from "src/leads/entities/lead.entity";
import { Status } from "src/statuses/entities/status.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm";

@Entity({ name: 'companies' })
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  employees: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @Column({ nullable: true, type: "text" })
  imageUrl: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  hiringFrom: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Status, (status) => status.companies, { cascade: true })
  @JoinTable()
  statuses: Status[]

  @OneToMany(() => Lead, (lead) => lead.company)
  leads: Lead[]

}
