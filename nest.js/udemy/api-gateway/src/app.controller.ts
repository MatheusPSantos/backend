import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateCategoryDto } from './dtos/create-catergory.dto';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

  /**
   * Instância da classe ClientProxy que permite recebermos mensagem e encaminhar para o broker de forma assincrona
   * ClientProxy que será configurada para trabalhar como um transporter específico
   * vamos usar por meio de injeção de independencia
   */
  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:YpFiVLQt6LHO@18.233.163.162:5672/bitnami-curso-udemy'], // 5672 é a porta de conexão e o prox é o virtual host
        queue: 'admin-backend'
      }
    }); // usando o conceito de factory
  }


  @Post('category')
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return await this.clientAdminBackend.emit('create-category', createCategoryDto);
  }



}
