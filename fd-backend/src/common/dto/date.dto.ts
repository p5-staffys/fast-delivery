import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class QueryDateDto {
  @AutoMap()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: Date, example: '2022-03-04', required: true })
  date: Date;
}
