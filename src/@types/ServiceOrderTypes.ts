export interface ICommentCreation {
  comment: string
  userId: number
};

export interface IServiceOrder {
  id?: number
  identifier: string
  description: string
  requestedAt: string
  exectionValue: number
  chargedValue: number
  comments?: string
  costCenter: number
  status: number
  category: number[]
};

export interface IDataToUpdate {
  identifier?: string
  description?: string
  executionValue?: number
  chargedValue?: number
  requestedAt?: Date
}
