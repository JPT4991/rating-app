import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/comments.dto';
import { Comments, CommentsDocument } from './schema/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<CommentsDocument>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
  ): Promise<Comments> {
    const newComment = new this.commentsModel({
      ...createCommentDto,
      createdBy: userId,
    });
    return newComment.save();
  }

  async findAllByCardId(cardId: string): Promise<Comments[]> {
    return this.commentsModel
      .find({ cardId })
      .populate('createdBy', 'username')
      .exec();
  }
}
