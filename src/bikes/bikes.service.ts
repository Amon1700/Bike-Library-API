import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './entities/bike.entity';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4, validate as isUUID } from 'uuid';

@Injectable()
export class BikesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: BetterSQLite3Database<typeof schema>,
  ) {} // Injecting the database provider

  async create(createBikeDto: CreateBikeDto) {
    const result = await this.db // Create a new bike entry in the database
      .insert(schema.bike)
      .values({
        id: uuidv4(), // Generate a unique ID for the bike
        ...createBikeDto, // Spread the properties from the DTO
      })
      .returning();

    return result[0]; // Return the created bike
  }

  async findAll() {
    const bikes = await this.db.query.bike.findMany(); // Retrieve all bikes from the database

    if (!bikes.length) throw new NotFoundException('no bikes found'); // Throw an error if no bikes are found

    return bikes; // Return the list of bikes
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new BadRequestException('invalid uuid'); // Validate the UUID format

    const bike = await this.db.query.bike.findFirst({
      where: eq(schema.bike.id, id),
    }); // Query for the bike with the given ID

    if (!bike) throw new NotFoundException('bike not found'); // Throw an error if the bike is not found

    return bike; // Return the found bike
  }

  async update(id: string, updateBikeDto: UpdateBikeDto) {
    if (!isUUID(id)) throw new BadRequestException('invalid uuid'); // Validate the UUID format

    const bike = await this.db.query.bike.findFirst({
      where: eq(schema.bike.id, id),
    }); // Query for the bike to update

    if (!bike) throw new NotFoundException('bike not found'); // Throw an error if the bike is not found

    const updateBike = {
      id: bike.id,
      make: updateBikeDto.make || bike.make,
      model: updateBikeDto.model || bike.model,
      year: updateBikeDto.year || bike.year,
      type: updateBikeDto.type || bike.type,
    }; // Prepare the updated bike data, using existing values if not provided

    const updatedBike = await this.db
      .update(schema.bike)
      .set(updateBike) // Set the updated values
      .where(eq(schema.bike.id, id)) // Specify the bike to update
      .returning();

    return updatedBike[0]; // Return the updated bike
  }

  async remove(id: string) {
    if (!isUUID(id)) throw new BadRequestException('invalid uuid'); // Validate the UUID format

    const bike = await this.db.query.bike.findFirst({
      where: eq(schema.bike.id, id),
    }); // Query for the bike to delete

    if (!bike) throw new NotFoundException('bike not found'); // Throw an error if the bike is not found

    const deletedbike = await this.db
      .delete(schema.bike)
      .where(eq(schema.bike.id, id)) // Specify the bike to delete
      .returning();

    return deletedbike[0]; // Return the deleted bike
  }
}
