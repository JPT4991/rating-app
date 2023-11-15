import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ratings, RatingsSchema } from './schema/ratings.schema';
import { Cards, CardsSchema } from 'src/cards/schema/cards.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ratings.name,
        schema: RatingsSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Cards.name,
        schema: CardsSchema,
      },
    ]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
