import { Customer } from "../database/entity/Customer";
import { AppDataSource } from "../database/data-source";
import { CostCenter } from "../database/entity/CostCenter";
import { Contract } from "../database/entity/Contract";
import { In } from 'typeorm';

const customerRepository = AppDataSource.getRepository(Customer);
const costCenterRepository = AppDataSource.getRepository(CostCenter);
const contractRepository = AppDataSource.getRepository(Contract);

interface ICustomerDTO {
  customer?: Customer
  couldExecute: boolean
  message?: string
}

class CustomerService {

  private async validateCostCenterArray(ids: number[]): Promise<boolean> {

    for (let id in ids) {
      const costCenter = await costCenterRepository.findOneBy({ id: Number(id) });
      if(!costCenter) {
        return false;
      };
    };
    return true;
  };
  

  public async addNew(name: string, costCenterIds: Array<number>, contractId: number): Promise<ICustomerDTO> {
    const allCostCentersValid = await this.validateCostCenterArray(costCenterIds);
    const contract = await contractRepository.findOneBy({ id: contractId });

    if(!contract) return { couldExecute: false, message: 'contract not found' };
    if(!allCostCentersValid) return { couldExecute: false, message: 'incorrect cost center entries' };

    const costCenters = await costCenterRepository.findBy({ id: In(costCenterIds)});

    const newCustomer = new Customer();
    newCustomer.name = name;
    newCustomer.costCenter = costCenters;
    newCustomer.contract = contract;

    await customerRepository.save(newCustomer);
    return { customer: newCustomer, couldExecute: true };
  };


  public async readAll(): Promise<Customer[]> {
    const allCustomers = await customerRepository.find();
    return allCustomers;
  };


  public async readById(id: number): Promise<ICustomerDTO> {
    const customer = await customerRepository.findOneBy({ id });

    if(customer) return { customer, couldExecute: true };

    return { couldExecute: false, message: 'customer not found' };
  };


  public async addNewCostCenter(id: number, newCostCenterId: number): Promise<ICustomerDTO> {
    const customer = await customerRepository.findOneBy({ id });
    if(!customer) return { couldExecute: false, message: 'customer not found' };

    const costCenter = await costCenterRepository.findOneBy({ id: newCostCenterId });
    if(!costCenter) return { couldExecute: false, message: 'cost center not found' };

    customer.costCenter.push(costCenter);
    
    await customerRepository.save(customer);
    return { couldExecute: true, customer };
  };


  public async removeCostCenter(id: number, costCenterId: number): Promise<ICustomerDTO> {
    const costCenter = await costCenterRepository.findOneBy({ id: costCenterId });
    const customer = await customerRepository.findOneBy({ id });

    if(!customer) return { couldExecute: false, message: 'customer not found' };
    if(!costCenter) return { couldExecute: false, message: 'cost center not found' };

    const index = customer.costCenter.indexOf(costCenter);
    customer.costCenter.slice(index, 1);

    await costCenterRepository.save(customer);
    return { couldExecute: true, customer };
  };


  public async updateCustomerName(id: number, name: string): Promise<ICustomerDTO> {
    const customer = await customerRepository.findOneBy({ id });
    if(!customer) return { couldExecute: false, message: 'customer not found' };

    customer.name = name;
    await customerRepository.save(customer);
    return { couldExecute: true, customer };
  };


  public async updateContract(id: number, newContractId: number): Promise<ICustomerDTO> {
    const newContract = await contractRepository.findOneBy({ id: newContractId });
    const customer = await customerRepository.findOneBy({ id });

    if(!newContract) return { couldExecute: false, message: 'Contract not found' };
    if(!customer) return { couldExecute: false, message: 'customer not found' };

    customer.contract = newContract;
    await customerRepository.save(customer);
    return { couldExecute: true, customer };
  };


  public async deleteCustomer(id: number): Promise<boolean> {
    const customer = await customerRepository.findOneBy({ id });

    if(!customer) return false;

    await customerRepository.delete({ id });
    return true;
  };
}

export default new CustomerService();
