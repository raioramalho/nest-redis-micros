import { Controller, Logger, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

export class HelloDto {
  cep: string;
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @MessagePattern('getCep')
  getCep(@Payload() payload: HelloDto) {
    this.logger.debug(`Received payload: ${JSON.stringify(payload)}`);
    return this.appService.getCep(payload);
  }

  @MessagePattern('getStream')
  getStream(): StreamableFile {
    this.logger.debug(`Streaming file...`);
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
