import { Document, Model as MongooseModel, SaveOptions } from 'mongoose';

export interface Model<T extends Document> extends MongooseModel<T> {
  restore(query: Record<string, string>): Promise<boolean>;
  softDelete(
    query: Record<string, string>,
    options?: SaveOptions,
  ): Promise<boolean>;
}
