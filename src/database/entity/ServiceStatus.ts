import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ServiceOrder } from './ServiceOrder';

@Entity()
export class ServiceStatus {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.status)
  serviceOrder: ServiceOrder[];
};
