declare namespace Service {
  interface ResponseOnRegister {
    id: string;
  }

  interface ResponseOnLogin {
    name: string;
  }

  interface ResponseIncidentProfile {
    id: number;
    title: string;
    description: string;
    value: number;
    ong_id: string;
  }
}
