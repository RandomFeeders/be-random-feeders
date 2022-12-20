import { ClassSerializerInterceptor } from '@nestjs/common';
import { VersioningType } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@shared/http-exception.filter';
import { AppModule } from './app.module';
import envConfig from './config/environmnent.config';

async function bootstrap() {
	await envConfig();

	const app = await NestFactory.create(AppModule);

	app.enableVersioning({
		type: VersioningType.URI
	});

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector))
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true
		})
	);

	app.enableCors();
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

	const port = process.env.PORT || 3030;
	const config = new DocumentBuilder()
		.setTitle('Random Feeders')
		.setDescription('Random Feeders API')
		.setVersion('1.0')
		.addServer(`http://localhost:${port}`, 'Local')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(port, () =>
		console.log(`Server running on port: ${port}`)
	);
}

bootstrap();
