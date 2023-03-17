import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async getUsers() {
    return 'Returns all users';
  }

  async getActiveUsers() {
    return 'Returns amount of active users';
  }

  async getPackages() {
    return 'Returns all packages';
  }

  async getActivePackages() {
    return 'Returns amount of active packages';
  }

  async changeUserStatus(_id) {
    return `Changes user ${_id} status`;
  }
}
