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

  @OneToOne(() => Role, role => role.role, { cascade: true })
  @JoinColumn()
  role: Role | null

  @OneToMany(() => CostCenter, costCenter => costCenter.user, { cascade: true })
  @JoinColumn()
  costCenter: CostCenter[] | null;
};
