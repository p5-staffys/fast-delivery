import { IntersectionType } from '@nestjs/swagger';
import { QueryDateDto } from 'src/common/dto/date.dto';
import { QueryPaginationDto } from 'src/common/dto/pagination.dto';
import { QueryStatusDto } from 'src/common/dto/status.dto';

export class QueryPaginationWithDateAndStatusDto extends IntersectionType(
  QueryPaginationDto,
  QueryStatusDto,
  QueryDateDto,
) {}
