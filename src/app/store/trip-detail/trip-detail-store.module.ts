import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TripDetailEffects } from './effects';
import { tripDetailReducer } from './reducers';
import { tripDetailFeatureToken } from './tokens';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(tripDetailFeatureToken, tripDetailReducer),
    EffectsModule.forFeature([TripDetailEffects]),
  ],
})
export class TripDetailStoreModule {}
