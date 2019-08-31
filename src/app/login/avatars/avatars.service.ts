import { Injectable } from '@angular/core';
import { AVATARS } from './avatars';

@Injectable({
  providedIn: 'root',
})
export class AvatarsService {
  constructor() {}

  getAvatars() {
    return AVATARS;
  }
}
