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
import { FixtureSchema } from './schema/fixture.schema';
import { TeamSchema } from './schema/team.schema';
import { LinkSchema } from './schema/link.schema';
import { FixtureService } from './modules/fixture/fixture.service';
import { TeamService } from './modules/team/team.service';

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
    MongooseModule.forFeature([
      { name: 'Fixture', schema: FixtureSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Link', schema: LinkSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, FixtureService, TeamService],
})
export class AppModule {}
