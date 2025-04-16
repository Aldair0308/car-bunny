import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LavadosModule } from './lavados/lavados.module';
import { ExtrasModule } from './extras/extras.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/carbunnydb'),
    UsersModule,
    AuthModule,
    LavadosModule,
    ExtrasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
