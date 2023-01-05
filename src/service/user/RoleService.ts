import { Role } from "../../database/entity/Role";
import { AppDataSource } from '../../database/data-source';

const roleRepository = AppDataSource.getRepository(Role);

interface RoleDTO {
  role?: Role,
  found: boolean
}

class RoleService {
  public async store(roleName: string): Promise<Role> {
    const newRole = new Role();
    newRole.role = roleName;

    await roleRepository.save(newRole);
    return newRole;
  };


  public async read(id: number): Promise<RoleDTO> {
    const role = await roleRepository.findOneBy({ id });

    if(!role) return { found: false };
    return {role, found: true};
  };


  public async readAll(): Promise<Role[]> {
    const allRoles = await roleRepository.find();
    return allRoles;
  };


  public async update(id: number, newData: string): Promise<RoleDTO> {
    const role = await roleRepository.findOneBy({ id });

    if(role) {
      role.role = newData;
      await roleRepository.save(role);
      return { role, found: true};
    };

    return { found: false };
  };

  public async delete(id: number): Promise<boolean> {
    const role = await roleRepository.findOneBy({ id });

    if(role) {
      await roleRepository.delete({ id });
      return true;
    };

    return false;
  };
};

export default new RoleService();
