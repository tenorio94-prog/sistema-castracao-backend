import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsInt, IsBoolean, IsString, IsDateString } from 'class-validator';
import { ClinicalRecordType, SurgeryType } from '@prisma/client';

export class CreateClinicalRecordDto {
  @ApiProperty({ description: 'Medical record ID' })
  @IsInt()
  medicalRecordId: number;

  @ApiProperty({ description: 'Appointment ID (optional)', required: false })
  @IsOptional()
  @IsInt()
  appointmentId?: number;

  @ApiProperty({ description: 'Veterinarian ID responsible for the procedure' })
  @IsInt()
  veterinarianId: number;

  @ApiProperty({ 
    description: 'Clinical record type',
    enum: ClinicalRecordType,
    example: 'triage'
  })
  @IsEnum(ClinicalRecordType)
  type: ClinicalRecordType;

  @ApiProperty({ description: 'Treatment date', required: false })
  @IsOptional()
  @IsDateString()
  treatmentDate?: string;

  @ApiProperty({ description: 'Fit for surgery (triage)', required: false })
  @IsOptional()
  @IsBoolean()
  fitForSurgery?: boolean;

  @ApiProperty({ 
    description: 'Surgery type performed',
    enum: SurgeryType,
    required: false
  })
  @IsOptional()
  @IsEnum(SurgeryType)
  surgeryType?: SurgeryType;

  // === ANIMAL DATA (complementary) ===
  @ApiProperty({ description: 'Animal name', required: false })
  @IsOptional()
  @IsString()
  animalName?: string;

  @ApiProperty({ description: 'Breed', required: false })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiProperty({ description: 'Age', required: false })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiProperty({ description: 'Coat/fur color', required: false })
  @IsOptional()
  @IsString()
  coat?: string;

  @ApiProperty({ description: 'Weight', required: false })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiProperty({ description: 'Size/build', required: false })
  @IsOptional()
  @IsString()
  size?: string;

  // === OWNER DATA ===
  @ApiProperty({ description: 'Owner name', required: false })
  @IsOptional()
  @IsString()
  ownerName?: string;

  @ApiProperty({ description: 'Owner phone number', required: false })
  @IsOptional()
  @IsString()
  ownerPhone?: string;

  @ApiProperty({ description: 'Owner address', required: false })
  @IsOptional()
  @IsString()
  ownerAddress?: string;

  @ApiProperty({ description: 'House number', required: false })
  @IsOptional()
  @IsString()
  ownerNumber?: string;

  @ApiProperty({ description: 'Neighborhood', required: false })
  @IsOptional()
  @IsString()
  ownerNeighborhood?: string;

  @ApiProperty({ description: 'City', required: false })
  @IsOptional()
  @IsString()
  ownerCity?: string;

  @ApiProperty({ description: 'Reference point', required: false })
  @IsOptional()
  @IsString()
  ownerReference?: string;

  // === SERVICE TYPE ===
  @ApiProperty({ description: 'Clinical guidance', required: false })
  @IsOptional()
  @IsBoolean()
  clinicalGuidance?: boolean;

  @ApiProperty({ description: 'Return visit', required: false })
  @IsOptional()
  @IsBoolean()
  returnVisit?: boolean;

  @ApiProperty({ description: 'Consultation', required: false })
  @IsOptional()
  @IsBoolean()
  consultation?: boolean;

  @ApiProperty({ description: 'Treatment change', required: false })
  @IsOptional()
  @IsBoolean()
  treatmentChange?: boolean;

  // === HISTORY (ANAMNESIS) ===
  @ApiProperty({ description: 'Current history, previous treatment, background', required: false })
  @IsOptional()
  @IsString()
  anamnesis?: string;

  @ApiProperty({ description: 'Vaccinations given', required: false })
  @IsOptional()
  @IsString()
  vaccinations?: string;

  @ApiProperty({ description: 'Vaccination dates', required: false })
  @IsOptional()
  @IsString()
  vaccinationDate?: string;

  @ApiProperty({ description: 'Deworming history', required: false })
  @IsOptional()
  @IsString()
  deworming?: string;

  // === CLINICAL EXAMINATION - VITAL SIGNS ===
  @ApiProperty({ description: 'Rectal temperature (°C)', required: false })
  @IsOptional()
  @IsString()
  rectalTemp?: string;

  @ApiProperty({ description: 'Heart rate (/min)', required: false })
  @IsOptional()
  @IsString()
  heartRate?: string;

  @ApiProperty({ description: 'Respiratory rate (/min)', required: false })
  @IsOptional()
  @IsString()
  respiratoryRate?: string;

  @ApiProperty({ description: 'Pulse (/min)', required: false })
  @IsOptional()
  @IsString()
  pulse?: string;

  // === CLINICAL EXAMINATION - SPECIFIC SYSTEMS ===
  @ApiProperty({ description: 'General condition, mucous membranes, skin, lymph nodes', required: false })
  @IsOptional()
  @IsString()
  ectoscopy?: string;

  @ApiProperty({ description: 'Shape, content, stomach, liver', required: false })
  @IsOptional()
  @IsString()
  abdominalCavity?: string;

  @ApiProperty({ description: 'Ears, eyes, nose, mouth', required: false })
  @IsOptional()
  @IsString()
  headAndNeck?: string;

  @ApiProperty({ description: 'Behavior, reflexes, paralysis', required: false })
  @IsOptional()
  @IsString()
  nervousSystem?: string;

  @ApiProperty({ description: 'Palpation, percussion, auscultation', required: false })
  @IsOptional()
  @IsString()
  thoracicCavity?: string;

  @ApiProperty({ description: 'Bones and joints', required: false })
  @IsOptional()
  @IsString()
  locomotorSystem?: string;

  // === DIAGNOSIS AND PROGNOSIS ===
  @ApiProperty({ description: 'Clinical suspicion (Suspeita Clínica)', required: false })
  @IsOptional()
  @IsString()
  provisionalDiagnosis?: string;

  @ApiProperty({ description: 'Complementary exams', required: false })
  @IsOptional()
  @IsString()
  complementaryExams?: string;

  @ApiProperty({ description: 'Definitive diagnosis', required: false })
  @IsOptional()
  @IsString()
  definitiveDiagnosis?: string;

  @ApiProperty({ description: 'Prognosis', required: false })
  @IsOptional()
  @IsString()
  prognosis?: string;

  @ApiProperty({ description: 'General veterinarian notes', required: false })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({ description: 'Prescriptions and instructions', required: false })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ description: 'Additional observations / Free description', required: false })
  @IsOptional()
  @IsString()
  additionalNotes?: string;
}
