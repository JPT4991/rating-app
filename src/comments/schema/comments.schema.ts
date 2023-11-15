import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cards' })
  cardId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ required: true })
  text: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
