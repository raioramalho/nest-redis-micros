import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

export class HelloDto {
  cep: string;
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @MessagePattern('hello')
  getHello(@Payload() payload: HelloDto) {   
    this.logger.debug(`Received payload: ${JSON.stringify(payload)}`);
    return this.appService.getHello(payload);
  }
}
