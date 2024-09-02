import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  private isSelected$ = new BehaviorSubject<number | null>(null);

  public get selected$() {
    return this.isSelected$.asObservable();
  }

  public set selected(selected: number | null) {
    this.isSelected$.next(selected);
  }
}
