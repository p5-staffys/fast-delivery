import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  HydratedDocument, //instancia de un modelo
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { EntityNotFound } from '../../../common/error-handlers/exceptions';
import { Model } from '../softdelete/softDelete.interface';

export abstract class EntityRepository<T extends Document> {
  constructor(
    protected readonly entityModel: Model<T>,
    private readonly customMessage?: string,
  ) {}

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
    await entity.save();
    return entity;
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
  };

  //To Test
  updateEntityOrFail = async (
    filter: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    options?: QueryOptions,
    customMessage?: string,
  ): Promise<T> => {
    const data = await this.entityModel
      .findOneAndUpdate(filter, updateEntityData, {
        new: true,
        ...options,
      })
      .exec();
    customMessage = customMessage ?? '';
    if (!data)
      throw new EntityNotFound(
        `${customMessage}, ${this.entityModel.modelName}`,
      );
    return data;
  };

  deleteEntity = async (filter: FilterQuery<T>): Promise<boolean> => {
    const data = await this.entityModel.softDelete(filter);
    if (!data) throw new EntityNotFound(this.entityModel.modelName);
    return data;
  };

  restoreEntity = async (filter: FilterQuery<T>): Promise<boolean> => {
    const data = await this.entityModel.restore(filter);
    if (!data) throw new EntityNotFound(this.entityModel.modelName);
    return data;
  };
}
