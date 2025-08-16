import { Status, StatusParam, Patient } from '../../src/lambda/definitions/types';

describe('status test', () => {
  let statusId: string;
  const handler = require('../../src/lambda/handler');
  process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
  it('post status without symptom', async () => {
    const dummyPatientId = 'test-status-dummy-patient-1';
    const dummyCenterId = 'test-status-dummy-center';
    const dummyPostData: StatusParam = {
      SpO2: 97,
      body_temperature: 36.5,
      pulse: 60,
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result: Status = JSON.parse(response.body);
    expect(result.statusId).not.toBe(null);
    expect(result.SpO2).toBe(dummyPostData.SpO2);
    expect(result.body_temperature).toBe(dummyPostData.body_temperature);
    expect(result.pulse).toBe(dummyPostData.pulse);
    expect(result.centerId).toBe(dummyCenterId);
    expect(result.patientId).toBe(dummyPatientId);
    expect(result.created).not.toBe(null);
    expect(result.symptom).toBeUndefined();
  });

  it('post status with symptom (no remarks)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-2';
    const dummyCenterId = 'test-status-dummy-center';
    const dummyPostData: StatusParam = {
      SpO2: 98,
      body_temperature: 37.5,
      pulse: 75,
      symptom: {
        cough: true,
        phlegm: true,
        suffocation: true,
        headache: true,
        sore_throat: true,
        malaise: true,
        nausea: true,
        diarrhea: true,
        difficulty_eating: true,
        no_urination: true,
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result: Status = JSON.parse(response.body);
    expect(result.statusId).not.toBe(null);
    expect(result.SpO2).toBe(dummyPostData.SpO2);
    expect(result.body_temperature).toBe(dummyPostData.body_temperature);
    expect(result.pulse).toBe(dummyPostData.pulse);
    expect(result.centerId).toBe(dummyCenterId);
    expect(result.patientId).toBe(dummyPatientId);
    expect(result.created).not.toBe(null);
    expect(result.symptom!.cough).toBe(dummyPostData.symptom!.cough);
    expect(result.symptom!.phlegm).toBe(dummyPostData.symptom!.phlegm);
    expect(result.symptom!.headache).toBe(dummyPostData.symptom!.headache);
    expect(result.symptom!.sore_throat).toBe(dummyPostData.symptom!.sore_throat);
    expect(result.symptom!.suffocation).toBe(dummyPostData.symptom!.suffocation);
    expect(result.symptom!.malaise).toBe(dummyPostData.symptom!.malaise);
    expect(result.symptom!.nausea).toBe(dummyPostData.symptom!.nausea);
    expect(result.symptom!.diarrhea).toBe(dummyPostData.symptom!.diarrhea);
    expect(result.symptom!.difficulty_eating).toBe(dummyPostData.symptom!.difficulty_eating);
    expect(result.symptom!.no_urination).toBe(dummyPostData.symptom!.no_urination);
    expect(result.symptom!.remarks).toBeUndefined();
    expect(result.symptom!.symptomId).not.toBe(null);
  });

  it('post status with symptom', async () => {
    const dummyPatientId = 'test-status-dummy-patient-3';
    const dummyCenterId = 'test-status-dummy-center';
    const dummyPostData: StatusParam = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result: Status = JSON.parse(response.body);
    expect(result.statusId).not.toBe(null);
    expect(result.SpO2).toBe(dummyPostData.SpO2);
    expect(result.body_temperature).toBe(dummyPostData.body_temperature);
    expect(result.pulse).toBe(dummyPostData.pulse);
    expect(result.centerId).toBe(dummyCenterId);
    expect(result.patientId).toBe(dummyPatientId);
    expect(result.created).not.toBe(null);
    expect(result.symptom!.cough).toBe(dummyPostData.symptom!.cough);
    expect(result.symptom!.phlegm).toBe(dummyPostData.symptom!.phlegm);
    expect(result.symptom!.headache).toBe(dummyPostData.symptom!.headache);
    expect(result.symptom!.sore_throat).toBe(dummyPostData.symptom!.sore_throat);
    expect(result.symptom!.suffocation).toBe(dummyPostData.symptom!.suffocation);
    expect(result.symptom!.malaise).toBe(dummyPostData.symptom!.malaise);
    expect(result.symptom!.nausea).toBe(dummyPostData.symptom!.nausea);
    expect(result.symptom!.diarrhea).toBe(dummyPostData.symptom!.diarrhea);
    expect(result.symptom!.difficulty_eating).toBe(dummyPostData.symptom!.difficulty_eating);
    expect(result.symptom!.no_urination).toBe(dummyPostData.symptom!.no_urination);
    expect(result.symptom!.remarks).toBe(dummyPostData.symptom!.remarks);
    expect(result.symptom!.symptomId).not.toBe(null);
  });

  it('fail post status (missing required key)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      body_temperature: 36.0,
      pulse: 60,
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status (value is null)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: null,
      pulse: 60,
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status (value is undefined)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: undefined,
      pulse: 60,
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status (invalid spO2 type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 'dummy',
      body_temperature: 36.0,
      pulse: 60,
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status (invalid body_temperature type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 'dummy',
      pulse: 60,
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status (invalid pulse type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 'dummy',
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (missing required parameters)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {},
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid cough type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: 'dummy',
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid phlegm type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: 'dummy',
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid suffocation type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: 'dummy',
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid headache type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: 'dummy',
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid sore_throat type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: 'dummy',
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid malaise type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: 'dummy',
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid nausea type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: 'dummy',
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid diarrhea type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: 'dummy',
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid difficulty_eating type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: 'dummy',
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid no_urination type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: 'dummy',
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('fail post status with symptom (invalid remarks type)', async () => {
    const dummyPatientId = 'test-status-dummy-patient-4';
    const invalidErrorCode = 'PRM00002';
    const invalidErrorMessage = 'Invalid Body';

    const dummyPostData = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 100,
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result = JSON.parse(response.body);

    expect(result.errorCode).toBe(invalidErrorCode);
    expect(result.errorMessage).toBe(invalidErrorMessage);
  });

  it('post status with symptom', async () => {
    const dummyPatientId = 'test-status-dummy-patient-3';
    const dummyCenterId = 'test-status-dummy-center';
    const dummyPostData: StatusParam = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result: Status = JSON.parse(response.body);
    expect(result.statusId).not.toBe(null);
    expect(result.SpO2).toBe(dummyPostData.SpO2);
    expect(result.body_temperature).toBe(dummyPostData.body_temperature);
    expect(result.pulse).toBe(dummyPostData.pulse);
    expect(result.centerId).toBe(dummyCenterId);
    expect(result.patientId).toBe(dummyPatientId);
    expect(result.created).not.toBe(null);
    expect(result.symptom!.cough).toBe(dummyPostData.symptom!.cough);
    expect(result.symptom!.phlegm).toBe(dummyPostData.symptom!.phlegm);
    expect(result.symptom!.headache).toBe(dummyPostData.symptom!.headache);
    expect(result.symptom!.sore_throat).toBe(dummyPostData.symptom!.sore_throat);
    expect(result.symptom!.suffocation).toBe(dummyPostData.symptom!.suffocation);
    expect(result.symptom!.malaise).toBe(dummyPostData.symptom!.malaise);
    expect(result.symptom!.nausea).toBe(dummyPostData.symptom!.nausea);
    expect(result.symptom!.diarrhea).toBe(dummyPostData.symptom!.diarrhea);
    expect(result.symptom!.difficulty_eating).toBe(dummyPostData.symptom!.difficulty_eating);
    expect(result.symptom!.no_urination).toBe(dummyPostData.symptom!.no_urination);
    expect(result.symptom!.remarks).toBe(dummyPostData.symptom!.remarks);
    expect(result.symptom!.symptomId).not.toBe(null);
  });
  it('post status with symptom', async () => {
    const dummyPatientId = 'test-status-dummy-patient-3';
    const dummyCenterId = 'test-status-dummy-center';
    const dummyPostData: StatusParam = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: dummyPostData,
    };
    const response = await handler.postStatus(params);
    const result: Status = JSON.parse(response.body);
    expect(result.statusId).not.toBe(null);
    statusId = result.statusId;
    expect(result.SpO2).toBe(dummyPostData.SpO2);
    expect(result.body_temperature).toBe(dummyPostData.body_temperature);
    expect(result.pulse).toBe(dummyPostData.pulse);
    expect(result.centerId).toBe(dummyCenterId);
    expect(result.patientId).toBe(dummyPatientId);
    expect(result.created).not.toBe(null);
    expect(result.symptom!.cough).toBe(dummyPostData.symptom!.cough);
    expect(result.symptom!.phlegm).toBe(dummyPostData.symptom!.phlegm);
    expect(result.symptom!.headache).toBe(dummyPostData.symptom!.headache);
    expect(result.symptom!.sore_throat).toBe(dummyPostData.symptom!.sore_throat);
    expect(result.symptom!.suffocation).toBe(dummyPostData.symptom!.suffocation);
    expect(result.symptom!.malaise).toBe(dummyPostData.symptom!.malaise);
    expect(result.symptom!.nausea).toBe(dummyPostData.symptom!.nausea);
    expect(result.symptom!.diarrhea).toBe(dummyPostData.symptom!.diarrhea);
    expect(result.symptom!.difficulty_eating).toBe(dummyPostData.symptom!.difficulty_eating);
    expect(result.symptom!.no_urination).toBe(dummyPostData.symptom!.no_urination);
    expect(result.symptom!.remarks).toBe(dummyPostData.symptom!.remarks);
    expect(result.symptom!.symptomId).not.toBe(null);
  });
  it('get statuses', async () => {
    const handler = require('../../src/lambda/handler');
    process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
    const dummyPatientId = 'test-status-dummy-patient-3';
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      }
    };
    const response = await handler.getStatuses(params);
    const result: Status[] = JSON.parse(response.body);
    expect(result.length).toBe(3);
  });
  it('delete statuses', async () => {
    const handler = require('../../src/lambda/handler');
    process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
    const dummyPatientId = 'test-status-dummy-patient-3';
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses/${statusId}`,
      pathParameters: {
        patientId: dummyPatientId,
        statusId: statusId,
      }
    };
    const response = await handler.deleteStatus(params);
    const result: Patient = JSON.parse(response.body);
    console.log(result);
    expect(result.statuses!.length).toBe(2);
  });
  it('get two statuses', async () => {
    const handler = require('../../src/lambda/handler');
    process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
    const dummyPatientId = 'test-status-dummy-patient-3';
    const params = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      }
    };
    const response = await handler.getStatuses(params);
    const result: Status[] = JSON.parse(response.body);
    expect(result.length).toBe(2);
  });

  it('post other statuses', async () => {
    let dummyPostData: StatusParam = {
      SpO2: 98,
      body_temperature: 36.0,
      pulse: 60,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        malaise: false,
        nausea: false,
        diarrhea: false,
        difficulty_eating: false,
        no_urination: false,
        remarks: 'dummy',
      },
    };
    const handler = require('../../src/lambda/handler');
    process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
    const dummyPatientId = 'test-status-dummy-patient-3';
    const params: any = {
      path: `api/admin/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      },
      body: {}
    };
    for (let i = 0; i < 50; i++){
      dummyPostData.SpO2 = 90 + Math.random() * 10
      dummyPostData.pulse = 70 + Math.random() * 20
      dummyPostData.body_temperature = 35 + Math.random() * 5
      params.body = dummyPostData
      await handler.postStatus(params)
    }
    params.body.symptom.remarks = 'latest one'
    await handler.postStatus(params)

  });
  it('get 53 statuses', async () => {
    const handler = require('../../src/lambda/handler');
    process.env.CENTER_TABLE_NAME = 'RemotePatientMonitoring-CenterTable-dev';
    process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
    const dummyPatientId = 'test-status-dummy-patient-3';
    const params = {
      path: `api/patient/patients/${dummyPatientId}/statuses`,
      pathParameters: {
        patientId: dummyPatientId,
      }
    };
    const response = await handler.getStatuses(params);
    const result: Status[] = JSON.parse(response.body);
    expect(result.length).toBe(53);
    let prevCreated = new Date().getTime();
    result.forEach (status => {
      let created = Date.parse(status.created)
      expect(created).toBeLessThanOrEqual(prevCreated)
      prevCreated = created;
    });
  });
  it('get latest 20 statuses', async () => {
    const handler = require('../../src/lambda/handler');
    process.env.CENTER_TABLE_NAME = 'RemotePatientMonitoring-CenterTable-dev';
    process.env.PATIENT_TABLE_NAME = 'RemotePatientMonitoring-PatientTable-dev';
    const dummyPatientId = 'test-status-dummy-patient-3';
    const params = {
      path: `api/patient/patients/${dummyPatientId}`,
      pathParameters: {
        patientId: dummyPatientId,
      }
    };
    const response = await handler.getPatient(params);
    const result: Patient = JSON.parse(response.body);
    expect(result.statuses!.length).toBe(20);
    expect(result.statuses![0].symptom!.remarks).toBe('latest one');
  });

});
