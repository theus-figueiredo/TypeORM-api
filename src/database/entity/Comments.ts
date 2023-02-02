import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ServiceOrder } from './ServiceOrder';
import { User } from './User';

@Entity()
export class Comment {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string

  @ManyToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.comments, { cascade: true })
  serviceOrder: ServiceOrder;

  @ManyToOne(() => User, (user) => user.comments, { cascade: true })
  user: User;
};
