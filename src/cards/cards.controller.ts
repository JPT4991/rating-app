import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '@nestjs/passport';
import { Cards } from './schema/cards.schema';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCardDto: CreateCardDto, @Request() req) {
    return this.cardsService.create(createCardDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<{ data: Cards[]; count: number; limit: number; page: number }> {
    return this.cardsService.findAll(limit, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.cardsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Cards | null> {
    return this.cardsService.update(id, req.user.userId, updateCardDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req): Promise<Cards | null> {
    return this.cardsService.remove(id, req.user.userId);
  }
}
