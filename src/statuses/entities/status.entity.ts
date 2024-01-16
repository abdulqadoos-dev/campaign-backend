import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
