import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany  } from "typeorm"
import { Comment } from "./Comments";
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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

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
