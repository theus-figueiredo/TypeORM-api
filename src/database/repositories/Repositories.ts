import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comments";
import { Contract } from "../entity/Contract";
import { ContractType } from "../entity/ContractType";
import { CostCenter } from "../entity/CostCenter";
import { Customer } from "../entity/Customer";
import { Role } from "../entity/Role";
import { ServiceCategory } from "../entity/ServiceCategorie";
import { ServiceOrder } from "../entity/ServiceOrder";
import { ServiceStatus } from "../entity/ServiceStatus";
import { User } from "../entity/User";

const commentRepository = AppDataSource.getRepository(Comment);
const contractRepository = AppDataSource.getRepository(Contract);
const contractTypeRepository = AppDataSource.getRepository(ContractType);
const costCenterRepository = AppDataSource.getRepository(CostCenter);
const customerRepository = AppDataSource.getRepository(Customer);
const roleRepository = AppDataSource.getRepository(Role);
const serviceCategoryRepository = AppDataSource.getRepository(ServiceCategory);
const serviceOrderRepository = AppDataSource.getRepository(ServiceOrder);
const serviceStatusRepository = AppDataSource.getRepository(ServiceStatus);
const userRepository = AppDataSource.getRepository(User);

export const repositories = {
  commentRepository,
  contractRepository,
  contractTypeRepository,
  costCenterRepository,
  customerRepository,
  roleRepository,
  serviceCategoryRepository,
  serviceOrderRepository,
  serviceStatusRepository,
  userRepository
};
