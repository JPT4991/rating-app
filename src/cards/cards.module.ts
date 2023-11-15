import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cards, CardsSchema } from './schema/cards.schema';
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { Ratings, RatingsSchema } from 'src/ratings/schema/ratings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cards.name,
        schema: CardsSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Ratings.name,
        schema: RatingsSchema,
      },
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
