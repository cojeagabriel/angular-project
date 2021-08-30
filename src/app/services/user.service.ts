import { ComponentFactoryResolver, Injectable } from '@angular/core';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): Observable<User> {
    return of({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    });
  }
}
