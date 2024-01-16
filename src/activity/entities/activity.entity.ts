
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'activites' })
export class Activity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
