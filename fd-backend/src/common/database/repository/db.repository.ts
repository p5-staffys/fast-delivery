import {
  Document,
  FilterQuery,
  HydratedDocument, //instancia de un modelo
  QueryOptions,
  UpdateQuery,
  Model,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  find = async (
    filter: FilterQuery<T>,
    pages = 1,
    limitPages = 20,
    sort = 'DESC',
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>[]> => {
    let sortBy: string;
    if (sort === 'DESC') sortBy = '-createdAt';
    else sortBy = 'createdat';

    const data = await this.entityModel
      .find(filter, { __v: 0, ...projection })
      .sort(sortBy)
      .skip((pages - 1) * limitPages)
      .limit(limitPages)
      .exec();

    return data;
  };

  findOneOrFail = async (
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    const data = await this.entityModel
      .findOne(filter, { __v: 0, ...projection })
      .exec();

    return data;
  };

  findOne = async (
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    return await this.entityModel
      .findOne(filter, { __v: 0, ...projection })
      .exec();
  };

  findAndCountOrFail = async (filter: FilterQuery<T>): Promise<number> => {
    return await this.entityModel.countDocuments(filter).exec();
  };

  createEntity = async (createEntityData: unknown): Promise<T> => {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  };

  updateEntity = async (
    filter: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    options?: QueryOptions,
  ): Promise<T> => {
    const data = await this.entityModel
      .findOneAndUpdate(filter, updateEntityData, {
        new: true,
        ...options,
      })
      .exec();

    return data;
  };
}
