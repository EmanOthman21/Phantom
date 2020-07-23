import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from './user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload) {
    return (
      'Bearer ' +
      sign(payload, process.env.SECRET_KEY, { expiresIn: '67472347632732h' })
    );
  }
  async validateUser(payload: Payload) {
    const user = await this.userService.getUserById(payload._id);
    return user;
  }
}
