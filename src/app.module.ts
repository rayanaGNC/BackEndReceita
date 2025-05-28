import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [ReservaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
