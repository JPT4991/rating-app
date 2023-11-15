import {
  Body,
  Request,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/comments.dto';
import { Comments } from './schema/comments.schema';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<Comments> {
    return this.commentsService.create(createCommentDto, req.user.userId);
  }

  @Get(':cardId')
  async findAllByCardId(@Param('cardId') cardId: string): Promise<Comments[]> {
    return this.commentsService.findAllByCardId(cardId);
  }
}
