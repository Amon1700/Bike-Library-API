import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikesModule } from './bikes/bikes.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [BikesModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
