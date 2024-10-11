import { PartialType } from '@nestjs/mapped-types';
import { CreateBikeDto } from './create-bike.dto';

/**
 * DTO for updating an existing bike.
 * This class extends CreateBikeDto to allow partial updates,
 * meaning that not all properties are required when updating a bike.
 * The properties from CreateBikeDto are inherited and made optional.
 */

export class UpdateBikeDto extends PartialType(CreateBikeDto) {}
