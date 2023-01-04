import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ServiceOrder } from './ServiceOrder';

@Entity()
export class ServiceCategory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @ManyToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.category, { nullable: true })
  serviceOrder: ServiceOrder[] | null;
};
