import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { CostCenter } from './CostCenter';
import { ServiceCategory } from './ServiceCategorie';
import { ServiceStatus } from './ServiceStatus';
import { Comment } from './Comments';

@Entity()
export class ServiceOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: String;

  @Column()
  description: String;

  @Column()
  creationDate: String;

  @Column()
  requestedAt: String

  @Column({ type: 'decimal', nullable: true })
  exectutionValue: number | null;

  @Column({ type: 'decimal', nullable: true })
  chargedValue: number | null;

  @OneToMany(() => Comment, (comment) => comment.serviceOrder, { nullable: true })
  @JoinColumn()
  comments: Comment[] | null;

  @ManyToOne(() => CostCenter, (costCenter) => costCenter.serviceOrder, { nullable: true })
  @JoinColumn()
  costCenter: CostCenter;

  @ManyToOne(() => ServiceStatus, (serviceStatus) => serviceStatus.status)
  @JoinColumn()
  status: ServiceStatus;

  @ManyToMany(() => ServiceCategory, (serviceCategory) => serviceCategory.serviceOrder)
  @JoinTable({
    name: "ServiceOrder_category",
    joinColumn: {
      name: "serviceOrder_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "serviceCategory_id",
      referencedColumnName: "id"
    }
  })
  category?: ServiceCategory[];
};
