import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LavadosModule } from './lavados/lavados.module';
import { ExtrasModule } from './extras/extras.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:hzFnpQynqjHUIubewLUwrtaPqLfLdPJx@maglev.proxy.rlwy.net:23993',
    ),
    UsersModule,
    AuthModule,
    LavadosModule,
    ExtrasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
