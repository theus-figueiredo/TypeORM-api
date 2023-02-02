import { ServiceOrder } from "../../database/entity/ServiceOrder";
import { CostCenter } from "../../database/entity/CostCenter";
import { ServiceStatus } from "../../database/entity/ServiceStatus";
import { ServiceCategory } from "../../database/entity/ServiceCategorie";
import { repositories } from "../../database/repositories/Repositories";
import _ from 'lodash';
import DateActions from "../../helpers/DateActions";
import { IServiceOrder } from "../../@types/ServiceOrderTypes";
import { IDataToUpdate } from "../../@types/ServiceOrderTypes";
import JwtActions from "../../helpers/JwtActions";
import { In } from "typeorm";

const {
  serviceOrderRepository,
  costCenterRepository,
  serviceCategoryRepository,
  serviceStatusRepository } = repositories;


class ServiceOrderServ {

  private async validateServiceOrder(id: number): Promise<ServiceOrder | null> {
    const serviceOrder = await serviceOrderRepository.findOne({ where: { id }, relations: ['costCenter', 'status', 'category', 'comments']});
    if(!serviceOrder) return null;
    return serviceOrder;
  }


  private async validateCostCenter(id: number): Promise<null | CostCenter> {
    const costCenter = await costCenterRepository.findOneBy({ id });

    if(!costCenter) return null;
    return costCenter;
  };


  private async validateCategory(ids: number[]): Promise<null |ServiceCategory[]> {
    const categoryArray = [] as ServiceCategory[];

    for(let index = 0 ; index < ids.length; index += 1) {
      const id = ids[index];
      const category = await serviceCategoryRepository.findOneBy({ id });

      if(!category) return null;
      categoryArray.push(category);
    };

    return categoryArray;
  };


  private async validateSingleCategory(id: number): Promise<ServiceCategory | null> {
    const category = await serviceCategoryRepository.findOneBy({id});

    if(!category) return null;
    
    return category;
  }

  private async validateStatus(id: number): Promise<null | ServiceStatus> {
    const status = await serviceStatusRepository.findOneBy({ id });

    if(!status) return null;
    return status;
  };


  private async assignData(serviceOrder: ServiceOrder, data: IDataToUpdate): Promise<ServiceOrder | null> {
    try {
      for( let [key, value] of Object.entries(data)) {
        (serviceOrder as any)[key] = value
      };
      
      await serviceOrderRepository.save(serviceOrder);
      return serviceOrder;
    } catch (error) {
      return null;
    }
  };


  public async store(data: IServiceOrder): Promise<ServiceOrder | null> {
    const serviceOrder = new ServiceOrder();

    const categories = await this.validateCategory(data.category);
    const status = await this.validateStatus(data.status);
    const costCenter = await this.validateCostCenter(data.costCenter);
    const isValidDate = DateActions.isValidDate(data.requestedAt);

    if (!categories || !status || !costCenter || !isValidDate) return null;

    serviceOrder.category = [...categories];
    serviceOrder.status = status;
    serviceOrder.costCenter = costCenter;
    serviceOrder.chargedValue = data.chargedValue;
    serviceOrder.comments = null;
    serviceOrder.description = data.description;
    serviceOrder.identifier = data.identifier;
    serviceOrder.exectutionValue = data.exectionValue;
    serviceOrder.requestedAt = data.requestedAt;


    serviceOrder.creationDate = DateActions.getDateAsString();
    await serviceOrderRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async getAll(token: string): Promise<ServiceOrder[] | null> {
    const { data } = JwtActions.authenticateUser(token);
    if(!data) return null;

    if(data.role !== 'admin') {

      const allServiceOrders = await serviceOrderRepository.find({
        where: { costCenter: In(data.costCenter)},
        relations: ['costCenter', 'status', 'category']
      });
        return allServiceOrders;
      };

    const allServiceOrders = await serviceOrderRepository.find({ relations: ['costCenter', 'status', 'category']});
    return allServiceOrders;
  };


  public async getById(id: number): Promise<ServiceOrder | null> {
    const serviceOrder = await serviceOrderRepository.findOne({ where: { id }, relations: ['costCenter', 'status', 'category']});
    if(!serviceOrder) return null;

    return serviceOrder;
  };


  public async updateGeneralData(id: number, data: IDataToUpdate): Promise<null | ServiceOrder> {
    const serviceOrder = await this.validateServiceOrder(id);
    if(!serviceOrder) return null;

    const updatedData = await this.assignData(serviceOrder, data);
    return updatedData;
  };


  public async updateStatus(id: number, newStatusId: number): Promise<ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const newStatus = await this.validateStatus(newStatusId);

    if(!serviceOrder || !newStatus) return null;

    serviceOrder.status = newStatus;
    await serviceOrderRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async addNewCategory(id: number, categoryId: number): Promise <ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const newCategory = await this.validateSingleCategory(categoryId);

    if(!serviceOrder || !newCategory) return null;

    serviceOrder.category?.push(newCategory);
    await serviceOrderRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async removeCategory(id: number, categoryId: number): Promise<ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const category = await this.validateSingleCategory(categoryId);

    if(!serviceOrder || !category) return null;

    const index = serviceOrder.category?.indexOf(category);
    if(index) serviceOrder.category?.splice(index, 1);
    await serviceOrderRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async updateCostCenter(id: number, costCenterId: number): Promise<ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const costCenter = await this.validateCostCenter(costCenterId);

    if(!serviceOrder || !costCenter) return null;

    serviceOrder.costCenter = costCenter;
    await serviceOrderRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async delete(id: number): Promise<Boolean> {
    const serviceOrder = await this.validateServiceOrder(id);
    if(!serviceOrder) return false;
    await serviceOrderRepository.delete({ id });
    return true;
  };
};

export default new ServiceOrderServ();