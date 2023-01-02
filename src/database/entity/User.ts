import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable  } from "typeorm"
import { CostCenter } from "./CostCenter";
import { Role } from "./Role";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, role => role.user, { cascade: true, nullable: true })
  @JoinColumn({ name: 'role'})
  role: Role | null;

  @ManyToMany(() => CostCenter, costCenter => costCenter.user, { cascade: true, nullable: true })
  @JoinTable({ 
    name: "user_costCenter",
    joinColumn: { 
      name: "costCenter_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  costCenter: CostCenter[] | null;
};
