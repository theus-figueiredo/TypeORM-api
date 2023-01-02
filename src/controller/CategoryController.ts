import CategoryService from "../service/CategoryService";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import getErrorMessage from "../helpers/GetErrorMessage";

class CategoryController {

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { category } = req.body;
      const newCategory = await CategoryService.store(category);
      return res.status(StatusCodes.CREATED).json(newCategory);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allCategories = await CategoryService.readAll();
      return res.status(StatusCodes.OK).json(allCategories);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const category = await CategoryService.readById(Number(id));

      if(!category) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });

      return res.status(StatusCodes.OK).json(category);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { category } = req.body;

      const updatedCategory = await CategoryService.update(Number(id), category);

      if(!updatedCategory) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });

      return res.status(StatusCodes.OK).json(updatedCategory);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await CategoryService.delete(Number(id));

      if(!deleted) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });

      return res.status(StatusCodes.OK).json({ message: 'deleted' });
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    }
  };
};

export default new CategoryController();