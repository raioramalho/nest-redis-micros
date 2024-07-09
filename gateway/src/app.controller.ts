import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IsNotEmpty, IsString } from 'class-validator';

export class HelloDto {
  @IsNotEmpty()
  @IsString()
  cep: string;
}

@Controller()
export class AppController {
  constructor(
    @Inject('Gateway') private client: ClientProxy,    
  ) {}

  @Post()
  getHello(@Body() body: HelloDto) {
    return this.client.send('hello', body);
  }
}
