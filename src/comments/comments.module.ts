import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments, CommentsSchema } from './schema/comments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Cards, CardsSchema } from 'src/cards/schema/cards.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Cards.name,
        schema: CardsSchema,
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
