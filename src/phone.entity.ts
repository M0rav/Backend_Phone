import { ClassSerializerInterceptor } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhoneBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'bigint' })
  phonenumber: number;

  @Column()
  name: string;
}
