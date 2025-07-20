import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class CreateCouponDto {

  @ApiProperty({ description: "Unique code for the coupon", example: "SAVE20" })
  @IsString()
  @IsNotEmpty()
  couponCode: string;

  @ApiProperty({ description: "Type of discount", enum: ['FIXED','PERCENTAGE'], example: "PERCENTAGE" })
  @IsEnum(['FIXED','PERCENTAGE'])
  @IsNotEmpty()
  discountType: "FIXED" | "PERCENTAGE";

  @ApiProperty({ description: "Discount amount(amount for Fixed, percentage for Percentage)", example: 50})
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  discountAmount: number;

  @ApiProperty({ description: "Scope of the coupon", enum: ['PRODUCT','CATEGORY','FLAT'], example: "Product" })
  @IsEnum(['PRODUCT','CATEGORY','FLAT'])
  @IsNotEmpty()
  scope: 'PRODUCT' | 'CATEGORY' | 'FLAT'; 

  @ApiProperty({ description: "Store ID",  example: 101 })
  @IsInt()
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @ApiProperty({ description: "Product ID ",  example: 101 })
  @IsOptional()
  @IsNumber()
  productId: number;

  @ApiProperty({ description: "Category ID", example: 5 })
  @IsOptional()
  @IsNumber()
  categoryId: number;


  @ApiProperty({ description: "Expiration date (ISO FORMAT)",  example: "2023-12-31T23:59:59Z", required: false })
  @IsOptional()
  @IsDateString()
  expireAt: Date;

}
 