import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Bikes') // Grouping the endpoints under the "bikes" tag
@Controller('bikes') // Base route for this controller
export class BikesController {
  constructor(private readonly bikesService: BikesService) {} // Injecting BikesService

  @Post() // Create a new bike
  @ApiOperation({ summary: 'Create a new bike' }) // Description of the operation
  @ApiResponse({
    status: 201,
    description: 'The bike has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body(ValidationPipe) createBikeDto: CreateBikeDto) {
    return this.bikesService.create(createBikeDto); // Calls service to create bike
  }

  @Get() // Retrieve all bikes
  @ApiOperation({ summary: 'Retrieve all bikes' })
  @ApiResponse({ status: 200, description: 'List of bikes.' })
  findAll() {
    return this.bikesService.findAll(); // Calls service to get all bikes
  }

  @Get(':id') // Retrieve a bike by ID
  @ApiOperation({ summary: 'Retrieve a bike by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bike has been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  findOne(@Param('id') id: string) {
    return this.bikesService.findOne(id); // Calls service to get bike by ID
  }

  @Patch(':id') // Update a bike by ID
  @ApiOperation({ summary: 'Update a bike by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bike has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBikeDto: UpdateBikeDto,
  ) {
    return this.bikesService.update(id, updateBikeDto); // Calls service to update bike
  }

  @Delete(':id') // Delete a bike by ID
  @ApiOperation({ summary: 'Delete a bike by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bike has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  remove(@Param('id') id: string) {
    return this.bikesService.remove(id); // Calls service to delete bike
  }
}
