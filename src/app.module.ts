import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeamModule } from './modules/team/team.module';
import { FixtureModule } from './modules/fixture/fixture.module';
import { AuthModule } from './modules/admin/auth/auth.module';
import { TeamModule } from './modules/admin/team/team.module';
import { FixtureModule } from './modules/admin/fixture/fixture.module';

@Module({
  imports: [AuthModule, TeamModule, FixtureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
