import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const data = this.appService.getHello();
    return{
      success: true,
      status: 200,
      message: "Success",
      reponse: data,
      
    }
  }
}

