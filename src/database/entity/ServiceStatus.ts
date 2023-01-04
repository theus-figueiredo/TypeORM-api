import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ServiceOrder } from './ServiceOrder';

@Entity()
export class ServiceStatus {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.status)
  serviceOrder: ServiceOrder[];
};
