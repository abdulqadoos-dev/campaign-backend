import { User } from "src/entities/user.entity";
import { Lead } from "src/leads/entities/lead.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'campaigns' })
export class Campaign {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.campaigns)
  user: User

  @OneToMany(() => Lead, (lead) => lead.campaign)
  leads: Lead[]

}
