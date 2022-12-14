import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany  } from "typeorm"
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

  @OneToOne(() => Role, role => role.role)
  @JoinColumn()
  role: Role | null

  @OneToMany(() => CostCenter, costCenter => costCenter.user)
  @JoinColumn()
  costCenter: CostCenter[] | null;
};
