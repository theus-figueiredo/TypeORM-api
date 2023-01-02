import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { CostCenter } from './CostCenter';
import { ServiceCategorie } from './ServiceCategorie';
import { ServiceStatus } from './ServiceStatus';

@Entity()
export class ServiceOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  OS_ID: string;

  @Column()
  description: string;

  @Column()
  creationDate: string;

  @Column()
  chargingDate: String

  @Column({ type: 'decimal' })
  exectutionValue: number;

  @Column({ type: 'decimal' })
  chargedValue: number;

  @OneToMany(() => CostCenter, (costCenter) => costCenter.serviceOrder, { nullable: true })
  @JoinColumn()
  costCenter: CostCenter[];

  @ManyToMany(() => ServiceStatus, (serviceStatus) => serviceStatus.serviceOrder)
  @JoinTable({
    name: "ServiceOrder_status",
    joinColumn: {
      name: "serviceOrder_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "serviceOrder_id",
      referencedColumnName: "id"
    }
  })
  status: ServiceStatus;

  @ManyToMany(() => ServiceCategorie, (serviceCategorie) => serviceCategorie.OS)
  @JoinTable({
    name: "ServiceOrder_categorie",
    joinColumn: {
      name: "serviceOrder_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "serviceCategorie_id",
      referencedColumnName: "id"
    }
  })
  categorie: ServiceCategorie[];
};
