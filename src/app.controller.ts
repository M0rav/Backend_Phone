import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { IsDefined } from 'class-validator';
import e from 'express';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { AppService } from './app.service';
import newPhoneUserDTO from './newPhoneUser.dto';
import { PhoneBook } from './phone.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Post('phone/add/')
  async newPhoneNumber(@Body() newphoneuser: newPhoneUserDTO){
    const phoneRepoadd = this.dataSource.getRepository(PhoneBook);
    await phoneRepoadd.save(newphoneuser);
  }
  @Get('phone/list')
  async listPhoneNum() {
    const phoneRepo = this.dataSource.getRepository(PhoneBook);
    return await phoneRepo.find();
  }

  @Delete('phone/delete/:id')
  async deletePhoneNumber(@Param('id') id: number) {
    const phoneRepo = this.dataSource.getTreeRepository(PhoneBook);
    return await phoneRepo.delete(id);
  }

  @Get('phone/:id')
  async getPersonName(@Param('id') id: number) {
    try {
      const phoneRepo = this.dataSource.getRepository(PhoneBook);
      return await phoneRepo.findOneByOrFail({ id: id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(
          'Az id-hoz tartozó felhasználó nem létezik',
        );
      } else {
        throw e;
      }
    }
  }
}
