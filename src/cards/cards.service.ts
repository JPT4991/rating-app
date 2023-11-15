import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Cards, CardsDocument } from './schema/cards.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ratings, RatingsDocument } from 'src/ratings/schema/ratings.schema';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Cards.name) private cardsModel: Model<CardsDocument>,
    @InjectModel(Ratings.name) private ratingsModel: Model<RatingsDocument>,
  ) {}
  async create(createCardDto: CreateCardDto, userId: string): Promise<Cards> {
    const newCard = new this.cardsModel({
      ...createCardDto,
      createdBy: new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newCard.save();
  }

  async findAll(limit: number, page: number) {
    const data = await this.cardsModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await this.cardsModel.countDocuments().exec();

    return { data, count, limit, page };
  }

  async findOne(id: string) {
    const card = await this.cardsModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const ratings = await this.ratingsModel.find({ cardId: id });
    const averageRating = ratings.length
      ? ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length
      : 0;

    return { card, averageRating };
  }

  async update(
    id: string,
    userId: string,
    updateCardDto: UpdateCardDto,
  ): Promise<Cards | null> {
    const card = await this.cardsModel.findById(id).exec();

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (card.createdBy.toString() !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to update this card',
      );
    }

    return this.cardsModel
      .findByIdAndUpdate(id, updateCardDto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string): Promise<Cards | null> {
    const card = await this.cardsModel.findById(id).exec();

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (card.createdBy.toString() !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this card',
      );
    }

    return this.cardsModel.findByIdAndDelete(id).exec();
  }
}
