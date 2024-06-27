import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) { }

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.create(createEmailDto);
  }

  @Get()
  findAll() {
    return this.emailsService.findAll();
  }

  @Post('/search')
  search(@Body() filters: {}) {
    return this.emailsService.search(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailsService.update(+id, updateEmailDto);
  }

  @Post('/send')
  send(@Body() email: any){

    console.log(email , "new object")

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailsService.remove(+id);
  }

}
