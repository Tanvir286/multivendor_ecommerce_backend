import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  productDescription?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive() // Ensures the price is a positive number
  @Min(0) // Accepts 0 and above
  productPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  productStock?: number;

}

