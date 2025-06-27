import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive() // Ensures the price is a positive number
  @Min(0) // Accepts 0 and above
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  stock?: number;
}

