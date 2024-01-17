import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusesService.create(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusesService.findAll();
  }


  @Post('/search')
  search(@Body() filters: {}) {
    return this.statusesService.search(filters);
  }



  @Post('/type')
  findByType(@Body() type: any) {
    return this.statusesService.findByType(type);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusesService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusesService.remove(+id);
  }
}
