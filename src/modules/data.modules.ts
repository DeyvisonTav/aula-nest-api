import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DataModule {}
