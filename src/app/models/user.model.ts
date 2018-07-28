import * as _ from 'lodash';

export class User {
  _id: number;
  username: string;
  roles: string[];
  local: boolean;
  enabled: boolean;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;

  constructor(obj: any) {
    _.extend(this, obj);
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }

  isSupervisor(): boolean {
    return this.roles.includes('SUPERVISOR');
  }

  isTechnician(): boolean {
    return this.roles.includes('TECHNICIAN');
  }

  isRegular(): boolean {
    return !this.roles || this.roles.length === 0;
  }
}
