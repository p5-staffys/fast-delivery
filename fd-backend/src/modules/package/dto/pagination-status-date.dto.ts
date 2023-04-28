import { IntersectionType } from '@nestjs/swagger';
import { QueryDateDto } from '../../../common/dto/date.dto';
import { QueryPaginationDto } from '../../../common/dto/pagination.dto';
import { QueryStatusDto } from '../../../common/dto/status.dto';

export class QueryPaginationWithDateAndStatusDto extends IntersectionType(
  QueryPaginationDto,
  QueryStatusDto,
  QueryDateDto,
) {}
