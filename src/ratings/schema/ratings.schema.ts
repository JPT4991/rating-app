import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type RatingsDocument = Ratings & Document;

@Schema()
export class Ratings {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cards' })
  cardId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  rating: number;
}

export const RatingsSchema = SchemaFactory.createForClass(Ratings);
