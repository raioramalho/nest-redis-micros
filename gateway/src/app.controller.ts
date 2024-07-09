import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IsNotEmpty, IsString } from 'class-validator';
import { Cache } from 'cache-manager';

export class HelloDto {
  @IsNotEmpty()
  @IsString()
  cep: string;
}

@Controller()
export class AppController {
  constructor(
    @Inject('Gateway') private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @Get()
  async getCep(@Query() body: HelloDto) {
    return this.client.send(this.getCep.name, body);
  }

  @Get('/stream')
  async getStream() {
    return this.client.send(this.getStream.name, {});
  }
}
