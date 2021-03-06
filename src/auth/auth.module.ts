import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
