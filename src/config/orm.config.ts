import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export default async () => {
	const config: TypeOrmModuleOptions & { cli: any } = {
		type: 'mysql',
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		logging: process.env.DB_LOGGING == 'true',
		timezone: 'Z',
		synchronize: process.env.DB_SYNC == 'true',
		entities: [__dirname + '\\..\\**\\*.model{.ts,.js}'],
		migrations: [__dirname + '\\..\\shared\\migrations\\*.ts'],
		cli: {
			migrationsDir: 'src\\shared\\migrations'
		}
	};

	return config;
};
