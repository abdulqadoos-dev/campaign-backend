import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'conversations' })
export class Conversation {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: "text" })
  subject: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


}
