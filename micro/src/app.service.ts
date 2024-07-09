import { HttpException, Injectable } from '@nestjs/common';
import { HelloDto } from './app.controller';

@Injectable()
export class AppService {
  async getCep(payload: HelloDto) {
    try {
      const baseUrl = `https://cep.awesomeapi.com.br/json/${payload.cep}`;

      const request = await fetch(baseUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await request.json();

      if (!request.ok) {
        return {
          message: response.message,
          statusCode: request.status,
        };
      }

      return response;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
