
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'activities' })
export class Activity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
