import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração CORS para permitir requisições do frontend
  app.enableCors({
    origin: [
      'https://sistema-castracao-frontend.vercel.app', // Produção
      'http://localhost:3000', // Desenvolvimento local (React/Next.js)
      'http://localhost:3001', // Desenvolvimento local (alternativo)
      'http://127.0.0.1:3000', // Desenvolvimento local (alternativo)
      'http://localhost:8080', // Servidor de testes HTML
      'http://127.0.0.1:8080', // Servidor de testes HTML (alternativo)
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true, // Permite envio de cookies e headers de autenticação
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Configuração do prefixo global da API
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestão de Castração API')
    .setDescription('API para gerenciamento de castrações de animais')
    .setVersion('1.0')
    .addBearerAuth(
  { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' },
  'access-token',
)
.addBearerAuth(
  { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
  'refresh-token',
)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  
  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`🚀 Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger disponível em: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
