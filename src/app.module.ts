import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

;

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal:true}), MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017')],
  controllers: [],
  providers: [],
})
export class AppModule {}
