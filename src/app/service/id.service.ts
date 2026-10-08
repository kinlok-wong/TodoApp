import { Service } from '@angular/core';

@Service()
export class IdService {
  private currentId: number = 1;

  public getNextId(): number {
    return this.currentId++;
  }
}