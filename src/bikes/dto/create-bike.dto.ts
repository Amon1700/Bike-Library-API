import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new bike.
 * This class defines the structure of the data required to create a bike,
 * along with validation rules to ensure the data is valid.
 */

export class CreateBikeDto {
  @ApiProperty() // Swagger documentation
  @IsString() // Must be a string
  @IsNotEmpty()
  make: string;

  @ApiProperty() // Swagger documentation
  @IsString() // Must be a string
  @IsNotEmpty()
  model: string;

  @ApiProperty({ default: new Date().getFullYear() }) // Swagger documentation
  @IsNumber() // Must be a number
  @IsPositive() // Ensure the value is positive
  @Min(1900) // Minimum year
  @Max(new Date().getFullYear()) // Maximum year
  year: number;

  @ApiProperty({ enum: ['Cruiser', 'Sport'] }) // Swagger documentation with enum
  @IsEnum(['Cruiser', 'Sport'], {
    message: "valid type required ['Cruiser', 'Sport']",
  })
  type: 'Cruiser' | 'Sport';
}
