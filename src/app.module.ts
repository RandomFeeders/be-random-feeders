import ormConfig from '@config/orm.config';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot(),

		TypeOrmModule.forRootAsync({ useFactory: ormConfig }),

		AuthModule
	],

	controllers: [AppController],

	providers: [AppService]
})
export class AppModule {}
