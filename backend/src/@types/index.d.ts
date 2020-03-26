declare namespace DataBase {
  interface Incident {
    id: number;
    title: string;
    description: string;
    value: number;
    ong_id: string;
  }

  interface Ong {
    id: string;
    name: string;
    email: string;
    city: string;
    whatsapp: string;
    uf: string;
  }
}
