import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);
@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encryptPass(pass: String): string{
    return bcrypt.hashSync(pass, salt);
  }
}
