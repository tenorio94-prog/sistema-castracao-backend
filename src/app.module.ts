import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { PetOwnerModule } from './pet-owner/pet-owner.module';
import { AnimalsModule } from './animals/animals.module';
import { VeterinarianModule } from './veterinarian/veterinarian.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ClinicalRecordModule } from './clinical-record/clinical-record.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { SurgicalRecordModule } from './surgical-record/surgical-record.module';
import { AnestheticRecordModule } from './anesthetic-record/anesthetic-record.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    ScheduleModule.forRoot(),
    UserModule, 
    PrismaModule, 
    TokenModule, 
    AuthModule, 
    EmailModule, 
    PetOwnerModule, 
    AnimalsModule, 
    VeterinarianModule, 
    AppointmentModule, 
    ClinicalRecordModule, 
    MedicalRecordModule,
    SurgicalRecordModule,
    AnestheticRecordModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
