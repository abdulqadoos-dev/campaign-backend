import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ default: "new" })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
