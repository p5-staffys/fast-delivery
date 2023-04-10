import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  HydratedDocument, //instancia de un modelo
  QueryOptions,
  UpdateQuery,
  Model,
} from 'mongoose';
import { EntityNotFound } from '../../../common/error-handlers/exceptions';

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

    if (!data.length) throw new HttpException('Empty', HttpStatus.NO_CONTENT);
    return data;
  };

  findOneOrFail = async (
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    const data = await this.entityModel
      .findOne(filter, { __v: 0, ...projection })
      .exec();

    if (!data) throw new EntityNotFound(this.entityModel.modelName);

    return data;
  };

  findOne = async (
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    const data = await this.entityModel
      .findOne(filter, { __v: 0, ...projection })
      .exec();

    if (!data) throw new EntityNotFound(this.entityModel.modelName);
    return data;
  };

  findAndCountOrFail = async (filter: FilterQuery<T>): Promise<number> => {
    return await this.entityModel.countDocuments(filter).exec();
  };

  createEntity = async (createEntityData: unknown): Promise<T> => {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  };

  findOrCreate = async (
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    const data = await this.entityModel
      .findOne(filter, { __v: 0, ...projection })
      .exec();

    if (!data) {
      const entity = new this.entityModel(filter);

      return await entity.save();
    }
    return data;
  };

  findById = async (
    _id: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    const data = await this.entityModel
      .findById(_id, { __v: 0, ...projection })
      .exec();

    if (!data) throw new EntityNotFound(this.entityModel.modelName);
    return data;
  };

  findByIdAndDelete = async (
    _id: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<HydratedDocument<T>> => {
    const data = await this.entityModel
      .findByIdAndDelete(_id, { __v: 0, ...projection })
      .exec();

    if (!data) throw new EntityNotFound(this.entityModel.modelName);
    return data;
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

    if (!data) throw new EntityNotFound(this.entityModel.modelName);
    return data;
  }
}
