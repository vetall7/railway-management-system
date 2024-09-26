import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
  protected countdown = 10;

  private readonly router = inject(Router);

  private readonly cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown -= 1;
      this.cdr.detectChanges();

      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
