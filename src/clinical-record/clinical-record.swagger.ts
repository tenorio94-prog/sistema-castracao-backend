import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiBody, 
  ApiResponse,
  ApiBearerAuth 
} from '@nestjs/swagger';
import {
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '../decorators/swagger-decorators';

export function ApiCreateClinicalRecord() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Create a new clinical record',
      description: 'Creates a new complete clinical record (ficha clínica) for an animal. Includes patient data, owner information, vital signs, physical examination, diagnosis, and prognosis. Veterinarians and administrators can create records.'
    }),
    ApiBody({
      description: 'Complete clinical record data',
      schema: {
        type: 'object',
        required: ['medicalRecordId', 'veterinarianId', 'type'],
        properties: {
          medicalRecordId: { type: 'number', example: 1, description: 'ID of the medical record' },
          appointmentId: { type: 'number', example: 1, description: 'ID of the appointment (optional)' },
          veterinarianId: { type: 'number', example: 1, description: 'ID of the veterinarian' },
          type: { 
            type: 'string', 
            enum: ['triage', 'surgery', 'followUp'],
            example: 'triage',
            description: 'Type of clinical record'
          },
          treatmentDate: { type: 'string', format: 'date-time', example: '2025-11-16T10:00:00Z', description: 'Date of treatment' },
          fitForSurgery: { type: 'boolean', example: true, description: 'Fit for surgery (triage)' },
          surgeryType: { 
            type: 'string', 
            enum: ['orchiectomy', 'ovariohysterectomy'],
            example: 'ovariohysterectomy',
            description: 'Type of surgery performed'
          },
          // Animal data
          animalName: { type: 'string', example: 'Rex', description: 'Nome do animal' },
          breed: { type: 'string', example: 'Poodle', description: 'Raça' },
          age: { type: 'string', example: '3 anos', description: 'Idade' },
          coat: { type: 'string', example: 'Branco', description: 'Pelagem' },
          weight: { type: 'string', example: '8kg', description: 'Peso' },
          size: { type: 'string', example: 'Médio', description: 'Porte' },
          // Owner data
          ownerName: { type: 'string', example: 'João Silva', description: 'Nome do tutor' },
          ownerPhone: { type: 'string', example: '81999998888', description: 'Telefone' },
          ownerAddress: { type: 'string', example: 'Rua das Flores', description: 'Endereço' },
          ownerNumber: { type: 'string', example: '123', description: 'Número' },
          ownerNeighborhood: { type: 'string', example: 'Centro', description: 'Bairro' },
          ownerCity: { type: 'string', example: 'Recife', description: 'Cidade' },
          ownerReference: { type: 'string', example: 'Próximo ao mercado', description: 'Ponto de referência' },
          // Type of service
          clinicalGuidance: { type: 'boolean', example: true, description: 'Orientação Clínica' },
          returnVisit: { type: 'boolean', example: false, description: 'Retorno' },
          consultation: { type: 'boolean', example: false, description: 'Consulta' },
          treatmentChange: { type: 'boolean', example: false, description: 'Alteração Tratamento' },
          // History (Anamnesis)
          anamnesis: { type: 'string', example: 'Animal saudável, sem histórico de doenças', description: 'História atual, tratamento prévio' },
          vaccinations: { type: 'string', example: 'V10, Raiva', description: 'Vacinas aplicadas' },
          vaccinationDate: { type: 'string', example: '01/2025', description: 'Data das vacinações' },
          deworming: { type: 'string', example: 'Sim, 10/2024', description: 'Vermifugações' },
          // Vital signs
          rectalTemp: { type: 'string', example: '38.5', description: 'Temperatura Retal (°C)' },
          heartRate: { type: 'string', example: '120', description: 'Batimentos Cardíacos (/min)' },
          respiratoryRate: { type: 'string', example: '30', description: 'Movimentos Respiratórios (/min)' },
          pulse: { type: 'string', example: '120', description: 'Pulso (/min)' },
          // Physical examination
          ectoscopy: { type: 'string', example: 'Mucosas róseas, pelagem brilhante', description: 'Estado geral, mucosas, pele' },
          abdominalCavity: { type: 'string', example: 'Abdômen flácido, sem alterações', description: 'Cavidade abdominal' },
          headAndNeck: { type: 'string', example: 'Sem alterações', description: 'Cabeça e pescoço' },
          nervousSystem: { type: 'string', example: 'Comportamento normal, reflexos presentes', description: 'Sistema nervoso' },
          thoracicCavity: { type: 'string', example: 'Auscultação cardíaca e pulmonar normal', description: 'Cavidade torácica' },
          locomotorSystem: { type: 'string', example: 'Sem claudicação', description: 'Sistema locomotor' },
          // Diagnosis and prognosis
          provisionalDiagnosis: { type: 'string', example: 'Animal saudável', description: 'Suspeita Clínica' },
          complementaryExams: { type: 'string', example: 'Hemograma completo', description: 'Exames Complementares' },
          definitiveDiagnosis: { type: 'string', example: 'Animal apto para cirurgia', description: 'Diagnóstico Definitivo' },
          prognosis: { type: 'string', example: 'Excelente', description: 'Prognóstico' },
          observations: { type: 'string', example: 'Observações gerais', description: 'Observações gerais' },
          instructions: { type: 'string', example: 'Jejum de 8 horas', description: 'Prescrições e instruções' },
          additionalNotes: { type: 'string', example: 'Notas adicionais', description: 'Observações adicionais' },
        },
      },
      examples: {
        complete: {
          summary: 'Complete clinical record',
          value: {
            medicalRecordId: 1,
            appointmentId: 1,
            veterinarianId: 1,
            type: 'triage',
            animalName: 'Rex',
            breed: 'Poodle',
            age: '3 anos',
            coat: 'Branco',
            weight: '8kg',
            size: 'Pequeno',
            ownerName: 'João Silva',
            ownerPhone: '81999998888',
            ownerAddress: 'Rua das Flores',
            ownerNumber: '123',
            ownerNeighborhood: 'Centro',
            ownerCity: 'Recife',
            ownerReference: 'Próximo ao mercado',
            clinicalGuidance: true,
            returnVisit: false,
            consultation: false,
            treatmentChange: false,
            anamnesis: 'Animal saudável, vacinação em dia',
            vaccinations: 'V10, Raiva',
            vaccinationDate: '01/2025',
            deworming: 'Sim, 10/2024',
            rectalTemp: '38.5',
            heartRate: '120',
            respiratoryRate: '30',
            pulse: '120',
            ectoscopy: 'Mucosas róseas, pelagem brilhante',
            abdominalCavity: 'Abdômen flácido, sem alterações',
            headAndNeck: 'Sem alterações',
            nervousSystem: 'Comportamento normal, reflexos presentes',
            thoracicCavity: 'Auscultação cardíaca e pulmonar normal',
            locomotorSystem: 'Sem claudicação',
            fitForSurgery: true,
            provisionalDiagnosis: 'Animal saudável',
            complementaryExams: 'Hemograma completo',
            definitiveDiagnosis: 'Animal apto para cirurgia',
            prognosis: 'Excelente',
            observations: 'Animal em ótimas condições',
            instructions: 'Jejum de 8 horas antes da cirurgia',
            additionalNotes: 'Retornar em 7 dias para cirurgia',
          },
        },
        triage: {
          summary: 'Triage record',
          value: {
            medicalRecordId: 1,
            appointmentId: 1,
            veterinarianId: 1,
            type: 'triage',
            fitForSurgery: true,
            observations: 'Animal is in good health condition. All vital signs are normal.',
            instructions: 'Fast for 8 hours before surgery. Avoid water 2 hours before.',
          },
        },
        surgery: {
          summary: 'Surgery record',
          value: {
            medicalRecordId: 1,
            appointmentId: 2,
            veterinarianId: 1,
            type: 'surgery',
            surgeryType: 'ovariohysterectomy',
            observations: 'Surgery performed successfully without complications. Patient recovering well.',
            instructions: 'Elizabethan collar for 10 days. Return for suture removal in 10 days. Avoid physical activity.',
          },
        },
        followUp: {
          summary: 'Follow-up record',
          value: {
            medicalRecordId: 1,
            appointmentId: 3,
            veterinarianId: 1,
            type: 'followUp',
            observations: 'Wound healing properly. No signs of infection. Sutures can be removed.',
            instructions: 'Continue with Elizabethan collar for 3 more days. Animal is cleared for normal activities.',
          },
        },
      },
    }),
    ApiCreatedResponse('ClinicalRecord'),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation error or missing required fields for specific record types',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'fitForSurgery is required for triage records' },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
    ApiNotFoundResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}

export function ApiGetAllClinicalRecords() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Get all clinical records',
      description: 'Returns all clinical records with related data (medical record, animal, appointment, veterinarian). Accessible by veterinarians, administrators, and receptionists.'
    }),
    ApiOkResponse('ClinicalRecord'),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}

export function ApiGetClinicalRecordById() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Get a clinical record by ID',
      description: 'Returns a specific clinical record with all related data including animal, pet owner, appointment, and veterinarian information.'
    }),
    ApiOkResponse('ClinicalRecord'),
    ApiNotFoundResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}

export function ApiGetClinicalRecordsByMedicalRecord() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Get all clinical records by medical record ID',
      description: 'Returns all clinical records for a specific medical record, ordered by treatment date (most recent first).'
    }),
    ApiOkResponse('ClinicalRecord'),
    ApiNotFoundResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}

export function ApiGetClinicalRecordsByAnimal() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Get all clinical records by animal ID',
      description: 'Returns all clinical records for a specific animal by finding its medical record first, then retrieving all associated clinical records.'
    }),
    ApiOkResponse('ClinicalRecord'),
    ApiNotFoundResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}

export function ApiUpdateClinicalRecord() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Update a clinical record',
      description: 'Updates an existing clinical record. All fields are optional. Validates business rules based on record type.'
    }),
    ApiBody({
      description: 'Clinical record update data',
      schema: {
        type: 'object',
        properties: {
          medicalRecordId: { type: 'number', example: 1 },
          appointmentId: { type: 'number', example: 1 },
          veterinarianId: { type: 'number', example: 1 },
          type: { 
            type: 'string', 
            enum: ['triage', 'surgery', 'followUp'],
            example: 'triage'
          },
          treatmentDate: { type: 'string', format: 'date-time', example: '2025-11-16T10:00:00Z' },
          fitForSurgery: { type: 'boolean', example: true },
          surgeryType: { 
            type: 'string', 
            enum: ['orchiectomy', 'ovariohysterectomy'],
            example: 'ovariohysterectomy'
          },
          observations: { type: 'string', example: 'Updated observations' },
          instructions: { type: 'string', example: 'Updated instructions' },
        },
      },
    }),
    ApiOkResponse('ClinicalRecord'),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'surgeryType is required for surgery records' },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
    ApiNotFoundResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}

export function ApiDeleteClinicalRecord() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ 
      summary: 'Delete a clinical record',
      description: 'Permanently deletes a clinical record. Only administrators can perform this action.'
    }),
    ApiOkResponse('ClinicalRecord'),
    ApiNotFoundResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiInternalServerErrorResponse(),
  );
}
