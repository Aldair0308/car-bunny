import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LavadosService } from './lavados.service';
import { CreateLavadoDto } from './dto/create-lavado.dto';
import { UpdateLavadoDto } from './dto/update-lavado.dto';

@Controller('lavados')
export class LavadosController {
  constructor(private readonly lavadosService: LavadosService) {}

  @Post()
  async create(@Body() createLavadoDto: CreateLavadoDto) {
    return this.lavadosService.create(createLavadoDto);
  }

  @Get()
  async findAll() {
    return this.lavadosService.findAll();
  }

  @Get('pending')
  async findPending() {
    return this.lavadosService.findPending();
  }

  @Get('completed')
  async findFinished() {
    return this.lavadosService.findFinished();
  }

  @Get('responsible/:responsible')
  async findByResponsibleGroupedByDate(
    @Param('responsible') responsible: string,
  ) {
    return this.lavadosService.findByResponsibleGroupedByDate(responsible);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lavadosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLavadoDto: UpdateLavadoDto,
  ) {
    return this.lavadosService.update(id, updateLavadoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.lavadosService.remove(id);
  }

  @Get('week/current')
  async findCurrentWeek() {
    return this.lavadosService.findByWeek();
  }

  @Delete('week/delete')
  async removeByWeek(@Query('startDate') startDate: string) {
    return this.lavadosService.removeByWeek(startDate);
  }

  @Get('week/all')
  async findAllGroupedByWeek() {
    return this.lavadosService.findAllGroupedByWeek();
  }
}
