import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Ratings } from './schema/ratings.schema';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRating(
    @Body() createRatingDto: CreateRatingDto,
    @Request() req,
  ): Promise<Ratings> {
    return this.ratingsService.createOrUpdateRating(
      createRatingDto,
      req.user.userId,
    );
  }
}
