import { IsOptional, IsString } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
