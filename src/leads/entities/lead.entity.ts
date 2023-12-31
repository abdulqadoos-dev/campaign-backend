import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'leads' })
export class Lead {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  url: string;

  @Column()
  company: string;

  @Column()
  status: string;

  @Column()
  notes: string;

  @Column()
  company_url: string;

}
