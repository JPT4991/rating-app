import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cards, CardsDocument } from 'src/cards/schema/cards.schema';
import { Ratings, RatingsDocument } from './schema/ratings.schema';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Ratings.name) private ratingModel: Model<RatingsDocument>,
    @InjectModel(Cards.name) private cardModel: Model<CardsDocument>,
  ) {}

  async createOrUpdateRating(
    createRatingDto: CreateRatingDto,
    userId: string,
  ): Promise<Ratings> {
    const { cardId, rating } = createRatingDto;

    let ratingRecord = await this.ratingModel
      .findOne({ cardId, userId })
      .exec();

    if (ratingRecord) {
      ratingRecord.rating = rating;
      return ratingRecord.save();
    } else {
      ratingRecord = new this.ratingModel({
        cardId,
        rating,
        userId,
      });
      return ratingRecord.save();
    }
  }
}
