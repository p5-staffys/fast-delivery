import { Document, Model as MongooseModel, SaveOptions } from 'mongoose';

export interface Model<T extends Document> extends MongooseModel<T> {
  restore(query: Record<string, any>): Promise<boolean>;
  softDelete(
    query: Record<string, any>,
    options?: SaveOptions,
  ): Promise<boolean>;
}
