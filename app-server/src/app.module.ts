import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SalonModule } from './salon/salon.module';
import { EmployeeModule } from './employee/employee.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path'
import { ConfigModule } from '@nestjs/config';
import { SalonServiceModule } from './salon-service/salon-service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ServiceRenderedModule } from './service-rendered/service-rendered.module';
import { CouponModule } from './coupon/coupon.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    SalonModule,
    EmployeeModule,
    CouponModule,
    SalonServiceModule,
    AppointmentModule,
    ServiceRenderedModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
