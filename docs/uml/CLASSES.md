# クラス図

Chrome 拡張[PlantUML Visualizer](https://chrome.google.com/webstore/detail/plantuml-visualizer/ffaloebcmkogfdkemcekamlmfkkmgkcf/related?hl=ja-JP)をインストールして [classes.pu](classes.pu)を表示するか、 [PlantUML](https://plantuml.com/)で閲覧してください。

下記 code は classes.pu の内容です。

```uml
@startuml RemotePatientMonitoring
title 遠隔療養患者モニタリングシステムオブジェクト図
skinparam backgroundColor white

Center "0..*" --- "0..*" Nurse
Center o-- "0..*" Patient
Patient o-- "0..*" Status
Status *-- "1" Symptom
Patient o-- "0..*" Notification :通知を送った時に作成(2重送信防止)

class Center {
    String centerId
    String centerName
    Nurse[] Nurses
}

class Nurse {
    String nurseId
    Center[] Centers
}

class Patient {
    String patientId
    String phone
    Boolean display
    DateTime policy_accepted
    Status[] Statuses
    String centerId
}

class Status {
    String statusId
    DateTime created
    Integer SpO2
    Float body_temperature
    Integer pulse
    Symptom symptom
}

class Symptom {
    Boolean cough
    Boolean phlegm
    Boolean suffocation
    Boolean headache
    Boolean sore_throat
    Boolean malaise
    Boolean nausea
    Boolean diarrhea
    Boolean difficulty_eating
    Boolean no_urination
    String Remarks
}

class Notification {
    DateTime sent_time
}
@enduml
```
