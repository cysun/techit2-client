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

  password: string;
  password2: string;

  constructor(obj: any) {
    _.extend(this, obj);
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  set name(name: string) {
    const words = name.split(' ');
    this.firstName = words[0];
    this.lastName = words[1];
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
