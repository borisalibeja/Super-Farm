import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { UserModule } from './user/user.module';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { RBAC_POLICY } from './auth/rbac-policy';
import { EcoFarmDataModule } from './ecofarm-data/ecofarm-data.module';


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
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
  
  ],
})
export class AppModule {}
