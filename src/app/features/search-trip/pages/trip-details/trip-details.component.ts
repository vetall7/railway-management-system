import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ICarListItem,
  ICarModalDataInfo,
  IQuery,
  IRideCarriage,
  IRideError,
  IRideInformation,
  IRideSeatsInfo,
} from '@features/search-trip/models';
import { IRideCarriageData } from '@features/search-trip/models/ride-carriage-info.model';
import { SearchTripDetailService } from '@features/search-trip/services/search-trip-detail.service';
import { CarService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { Stepper } from 'primeng/stepper';

import { TripDetailFacade } from '../../../../store/trip-detail/facades';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailsComponent implements OnInit {
  private readonly tokeId: string = 'id';

  @ViewChild('customStepper') customStepper!: Stepper;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly router = inject(Router);

  private readonly message = inject(MessageService);

  private readonly tripDetailFacade = inject(TripDetailFacade);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  protected readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly carriageData: WritableSignal<IRideCarriageData[]> = signal([]);

  private readonly isSeatBookingVisible = signal(false);

  protected readonly car = inject(CarService);

  protected isSeatSelected = toSignal(this.car.selected$);

  protected isConfirmed = false;

  protected get isSeatBookingVisibleSig(): Signal<boolean> {
    return this.isSeatBookingVisible;
  }

  protected set isSeatBookingVisibleSig(value: boolean) {
    this.isSeatBookingVisible.set(value);
  }

  public calculateCarriageSeats: Signal<IRideSeatsInfo[]> = computed(() => {
    return this.carriageData().map((carriage: IRideCarriageData) => {
      return {
        type: carriage.code,
        seats: carriage.rows * (carriage.leftSeats + carriage.rightSeats),
      };
    });
  });

  public getCalculateCarList: Signal<Record<string, ICarListItem[]>> = computed(() => {
    return this.searchTrip.calculateCarList(
      this.rideData(),
      this.calculateCarriageSeats(),
      this.getAllOccupiedSeats(),
    );
  });

  protected readonly orderSelected: WritableSignal<number | null> = signal(null);

  public getAllOccupiedSeats: Signal<number[]> = computed(() => {
    return this.searchTrip.getAllOccupiedSeats(this.rideData(), this.orderSelected() ?? 0);
  });

  private readonly searchTrip = inject(SearchTripDetailService);

  protected readonly from: WritableSignal<number | null> = signal(null);

  protected readonly to: WritableSignal<number | null> = signal(null);

  protected modalData!: ICarModalDataInfo;

  protected readonly rideData: Signal<IRideInformation | null> = computed(() => {
    return this.searchTrip.setTrainDates(this.tripDetailFacade.rideData(), this.from(), this.to());
  });

  protected readonly isErrorParam: Signal<boolean> = computed(
    () =>
      /* eslint-disable operator-linebreak */
      !!this.rideData()?.path.includes(this.from() ?? 0) &&
      !!this.rideData()?.path.includes(this.to() ?? 0),
  );

  protected readonly carriageTypeInfo: Signal<IRideCarriage[] | null> = computed(() => {
    return this.searchTrip.getCarriageData(
      this.tripDetailFacade.rideData(),
      this.getCalculateCarList(),
    );
  });

  protected readonly rideError: Signal<IRideError> = this.tripDetailFacade.rideError;

  protected readonly orderId: WritableSignal<string | null> = signal(null);

  public ngOnInit(): void {
    this.isLoading.set(true);
    this.searchTrip.getCarriage().subscribe((value) => {
      this.carriageData.set(value);
      this.isLoading.set(false);
    });
    this.getParam();
    this.loadRide();
    this.car.clearSelected();
  }

  private getParam(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: IQuery | Params) => {
        this.from?.set(+value.from);
        this.to?.set(+value.to);
      });
  }

  private loadRide(): void {
    const id = this.activatedRoute.snapshot.paramMap.get(this.tokeId);
    this.tripDetailFacade.loadRide(id ?? '');
  }

  protected clearSelected() {
    this.car.selected = null;
  }

  protected isSuccess = signal(false);

  protected createOrder(modalData: ICarModalDataInfo): void {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('token')?.length) {
      this.searchTrip
        .createOrder({
          rideId: this.rideData()?.rideId ?? 0,
          seat: modalData.numberSeat,
          stationStart: this.from() ?? 0,
          stationEnd: this.to() ?? 0,
        })
        .subscribe(
          (value) => {
            if (value.id) {
              this.orderSelected.set(modalData.numberSeat);
              this.modalData = {} as ICarModalDataInfo;
              this.message.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order created success!',
              });
              this.orderId.set(value.id);
              // this.router.navigate(['/']);
              this.isSuccess.set(true);
              this.nextStep(2);
            }
          },
          (error) => {
            this.message.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            });
          },
        );
    } else {
      this.router.navigate(['/auth/signin']);
    }
  }

  protected nextStep(index: number): void {
    this.customStepper.activeStep = index + 1;
  }

  protected backStep(index: number): void {
    this.customStepper.activeStep = index - 1;
  }
}
