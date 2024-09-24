import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()

	const config = new DocumentBuilder()
		.setTitle('Corte Já')
		.setDescription('API de agendamento para salões!')
		.setVersion('1.0')
		.addTag('auth')
		.addTag('users')
		.addTag('saloons')
		.addTag('salon-services')
		.addTag('employees')
		.addTag('coupons')
		.addTag('services-rendered')
		.addTag('appointments')
		.addBearerAuth()
		.build();
	
	const document = SwaggerModule.createDocument(app,config);

	SwaggerModule.setup('api', app, document)

	await app.listen(3333)
}
bootstrap()