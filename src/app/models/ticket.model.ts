import { User } from './user.model';

export class Ticket {
  _id: number;
  createdBy: User;
  createdForName: string;
  createdForEmail: string;
  createdForPhone: string;
  createdForDepartment: string;

  subject: string;
  details: string;
  location: string;

  dateCreated: Date;
  dateAssigned: Date;
  dateUpdated: Date;
  dateClosed: Date;

  priority: string;
  status: string;

  techicians: number[] | User[];
  updates: [
    {
      details: string;
      technician: {
        id: number;
        username: string;
      };
      date: Date;
    }
  ];

  constructor(user: User) {
    this.createdBy = user;
    this.createdForName = user.name;
    this.createdForEmail = user.email;
    this.createdForPhone = user.phone;
    this.createdForDepartment = user.department;
  }
}
