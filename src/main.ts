import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe()); // Fazendo uma validação global pra qualquer requisição que chegar na aplicação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // não permite novos atributos no payload, só os informados no Dto
      forbidNonWhitelisted: true, // ocorrerá erros caso novos atributos sejam enviados que não estejam no Dto
      transform: true, // transforma os dados/objetos das informações que chegarem no payload, tipando o objeto com o Dto, sabendo lidar com o que tipo que está chegando na informação
    }),
  );
  await app.listen(3000);
}
bootstrap();
