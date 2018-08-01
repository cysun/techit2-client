import * as _ from 'lodash';
import { User } from './user.model';
import { Update } from './update.model';

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
  dateUpdated: Date;

  priority: string;
  status: string;

  // Apparently TypeScript hates number[] | User[]. Thanks to
  // https://mattferderer.com/typescript-cannot-invoke-an-expression-whose-type-lacks-a-call-signature
  // I finally got this shit to work.
  technicians: Array<number | User>;
  updates: Array<Update>;

  static fromObj(obj: any) {
    const ticket = new Ticket();
    _.extend(ticket, obj);
    return ticket;
  }

  setUser(user: User) {
    this.createdBy = user;
    this.createdForName = user.name;
    this.createdForEmail = user.email;
    this.createdForPhone = user.phone;
    this.createdForDepartment = user.department;
  }

  getTechnicians() {
    return this.technicians.map(technician => {
      if (typeof technician === 'object') {
        return technician;
      }
    });
  }

  getTechnicianIds() {
    return this.technicians.map(technician => {
      if (typeof technician === 'object') return technician._id;
      if (typeof technician === 'number') return technician;
    });
  }
}
