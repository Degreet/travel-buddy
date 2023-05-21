import { Module } from '@nestjs/common';
import { SomeModule } from './some/some.module';

@Module({
  imports: [SomeModule],
})
export class AppModule {}
