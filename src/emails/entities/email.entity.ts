import { Status } from "src/statuses/entities/status.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: 'emails' })
export class Email {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: "text" })
  subject: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @Column({ nullable: true, })
  count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Status, (status) => status.emails)
  @JoinTable()
  statuses: Status[]


}
