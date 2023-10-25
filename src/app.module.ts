import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TeamModule } from './modules/team/team.module';
import { FixtureModule } from './modules/fixture/fixture.module';
import { AuthModule as AdminAuthModule } from './modules/admin/auth/auth.module';
import { TeamModule as AdminTeamModule } from './modules/admin/team/team.module';
import { FixtureModule as AdminFixtureModule } from './modules/admin/fixture/fixture.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    TeamModule,
    FixtureModule,
    AdminAuthModule,
    AdminTeamModule,
    AdminFixtureModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.mongodbUri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
