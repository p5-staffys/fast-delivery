import { Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

export class Profile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  //this is for dto
  override get profile(): MappingProfile {
    return (mapper) => mapper;
  }
}
