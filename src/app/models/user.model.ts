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

  static fromObj(obj: any) {
    const user = new User();
    _.extend(user, obj);
    return user;
  }

  get name() {
    return (this.firstName + ' ' + this.lastName).trim();
  }

  set name(name: string) {
    const words = _.compact(name.split(' '));
    if (words.length < 1) {
      this.firstName = '';
      this.lastName = '';
    } else if (words.length < 2) {
      this.firstName = words[0];
      this.lastName = '';
    } else {
      this.firstName = words[0];
      this.lastName = words.slice(1).join(' ');
    }
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

  hasAnyRole(roles: string[]) {
    return _.intersection(this.roles, roles).length > 0;
  }
}
