import mongoose, {
  CallbackWithoutResultAndOptionalError,
  SaveOptions,
} from 'mongoose';

export const softDeletePlugin = (schema: mongoose.Schema): void => {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  schema.pre(
    'aggregate',
    function (
      this: mongoose.Aggregate<unknown>,
      next: CallbackWithoutResultAndOptionalError,
    ) {
      const matchStage = { $match: { deletedAt: null } };
      this.pipeline().unshift(matchStage);
      next();
    },
  );

  schema.pre(
    'find',
    function (
      this: mongoose.Query<unknown, unknown, object, unknown>,
      next: CallbackWithoutResultAndOptionalError,
    ) {
      this.where({ deletedAt: null });
      next();
    },
  );

  schema.pre(
    'findOne',
    function (
      this: mongoose.Query<unknown, unknown, object, unknown>,
      next: CallbackWithoutResultAndOptionalError,
    ) {
      this.where({ deletedAt: null });
      next();
    },
  );

  schema.pre(
    'findOneAndUpdate',
    function (
      this: mongoose.Query<unknown, unknown, object, unknown>,
      next: CallbackWithoutResultAndOptionalError,
    ) {
      this.where({ deletedAt: null });
      next();
    },
  );

  schema.pre(
    'count',
    function (
      this: mongoose.Query<unknown, unknown, object, unknown>,
      next: CallbackWithoutResultAndOptionalError,
    ) {
      this.where({ deletedAt: null });
      next();
    },
  );

  schema.pre(
    'countDocuments',
    function (
      this: mongoose.Query<unknown, unknown, object, unknown>,
      next: CallbackWithoutResultAndOptionalError,
    ) {
      this.where({ deletedAt: null });
      next();
    },
  );

  schema.static(
    'restore',
    async function (query: mongoose.FilterQuery<unknown>): Promise<boolean> {
      const updatedQuery = {
        ...query,
        deletedAt: !null,
      };
      const deletedTemplate = await this.findOne(updatedQuery);
      if (!deletedTemplate) return false;

      let restored = false;

      if (deletedTemplate.deletedAt !== null) {
        deletedTemplate.deletedAt = null;
        await deletedTemplate.save();
        restored = true;
      }

      return restored;
    },
  );

  schema.static(
    'softDelete',
    async function (
      query: mongoose.FilterQuery<unknown>,
      options?: SaveOptions,
    ): Promise<boolean> {
      const template = await this.findOne(query);
      if (!template) return false;

      let deleted = false;
      if (template.deletedAt === null) {
        template.deletedAt = new Date();
        await template.save(options);
        deleted = true;
      }

      return deleted;
    },
  );
};
