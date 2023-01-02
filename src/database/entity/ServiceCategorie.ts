import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ServiceOrder } from './ServiceOrder';

@Entity()
export class ServiceCategorie {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categorie: string;

  @ManyToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.categorie, { nullable: true })
  OS: ServiceOrder[] | null;
};
