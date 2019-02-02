import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartscreenPage } from './startscreen';

@NgModule({
  declarations: [
    StartscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(StartscreenPage),
  ],
})
export class StartscreenPageModule {}
