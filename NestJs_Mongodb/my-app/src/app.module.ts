import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CatalogueModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
