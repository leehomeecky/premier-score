import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TeamModule } from './modules/team/team.module';
import { FixtureModule } from './modules/fixture/fixture.module';
import { AuthModule as AdminAuthModule } from './modules/admin/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from './config/multer.config';

@Module({
  imports: [
    AuthModule,
    TeamModule,
    FixtureModule,
    AdminAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.mongodbUri),
    MulterModule.register(MulterConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
