import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { UserModule } from './user/user.module';
import { AccessControlModule } from 'nest-access-control';
import { EcoFarmDataModule } from './ecofarm-data/ecofarm.module';
import { RBAC_POLICY } from './auth/rbac/rbac-policy';

@Module({
  imports: [
    AccessControlModule.forRoles(RBAC_POLICY),
    AuthModule,
    PrismaModule,
    EcoFarmDataModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
})
export class AppModule {}
