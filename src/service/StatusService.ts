import { AppDataSource } from "../database/data-source";
import { ServiceStatus } from "../database/entity/ServiceStatus";

const serviceStatusRepo = AppDataSource.getRepository(ServiceStatus);

class StatusService {
  public async store(status: string): Promise<ServiceStatus> {
    const newStatus = new ServiceStatus();
    newStatus.status = status;

    await serviceStatusRepo.save(newStatus);
    return newStatus;
  };


  public async readAll(): Promise<ServiceStatus[]> {
    const allStatus = await serviceStatusRepo.find();
    return allStatus;
  };


  public async readById(id: number): Promise<ServiceStatus | null> {
    const serviceStatus = await serviceStatusRepo.findOneBy({ id });
    if (!serviceStatus) return null;
    return serviceStatus;
  };

  public async update(id: number, newStatus: string): Promise<ServiceStatus | null> {
    const serviceStatus = await serviceStatusRepo.findOneBy({ id });
    if (!serviceStatus) return null;

    serviceStatus.status = newStatus;
    await serviceStatusRepo.save(serviceStatus);
    return serviceStatus;
  };


  public async delete(id: number): Promise<Boolean> {
    const serviceStatus = await serviceStatusRepo.findOneBy({ id });
    if(!serviceStatus) return false;

    await serviceStatusRepo.delete({id});
    return true;
  }
};

export default new StatusService();