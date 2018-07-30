export class Update {
  summary?: string;
  details?: string;
  technician: {
    id: number;
    username: string;
  };
  date: Date;

  constructor() {
    this.date = new Date();
  }
}
