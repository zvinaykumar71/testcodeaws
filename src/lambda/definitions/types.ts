export interface Center {
  centerId: string;
  centerName: string;
  emergencyPhone: string;
}

export interface CenterParam {
  [key: string]: any;
  centerName?: string;
  emergencyPhone?: string;
}
export interface NurseOutput {
  nurseId: string;
  manageCenters: {
    centerName: string;
    centerId: string;
  }[];
}

export interface NurseParam {
  nurseId: string;
  manageCenters: {
    centerId: string;
  }[];
}
export interface PatientParam {
  patientId: string;
  phone: string;
  memo: string;
  display?: boolean;
  policy_accepted?: string;
  statuses?: Status[];
  centerId: string;
  sendSMS?: boolean;
  isAccepted?: boolean;
}

export interface Patient {
  patientId: string;
  phone: string;
  memo: string;
  display?: boolean;
  policy_accepted?: string;
  statuses?: Status[];
  centerId: string;
}
export interface Status {
  statusId: string;
  patientId: string;
  centerId: string;
  created: string;
  SpO2: number;
  body_temperature: number;
  pulse: number;
  symptom?: {
    symptomId: string;
    cough: boolean;
    phlegm: boolean;
    suffocation: boolean;
    headache: boolean;
    sore_throat: boolean;
    malaise: boolean;
    nausea: boolean;
    diarrhea: boolean;
    difficulty_eating: boolean;
    no_urination: boolean;
    remarks?: string;
  };
}

export interface Symptom {
  cough: boolean;
  phlegm: boolean;
  suffocation: boolean;
  headache: boolean;
  sore_throat: boolean;
  malaise: boolean;
  nausea: boolean;
  diarrhea: boolean;
  difficulty_eating: boolean;
  no_urination: boolean;
  remarks?: string;
}

export interface StatusParam {
  SpO2: number;
  body_temperature: number;
  pulse: number;
  symptom?: Symptom;
  created?: string;
}

export interface LoginResult {
  username: string;
  idToken: string;
  refreshToken: string;
}

export interface TempLoginParam {
  phone: string;
  sendSMS?: boolean;
}
export interface TempLoginInput {
  patientId: string;
  phone: string;
  loginKey: string;
}
export interface TempLoginResult {
  patientId: string;
  phone: string;
  loginKey: string;
  created: string;
}
