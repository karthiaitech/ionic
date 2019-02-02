import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BLE } from '@ionic-native/ble';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GlobalProvider } from '../providers/global/global';



import{ListPage}from '../pages/list/list'
import { MyApp } from './app.component';
import{  StartscreenPage }from'../pages/startscreen/startscreen';
import{  ControlscreenPage }from'../pages/controlscreen/controlscreen';
import{  ConnectPage }from'../pages/connect/connect';


@NgModule({
  declarations: [
    MyApp,
    StartscreenPage,
    ListPage,
    ControlscreenPage,
    ConnectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
    scrollAssist: true,
    autoFocusAssist: true
    })
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartscreenPage,
    ListPage,
    ControlscreenPage,
    ConnectPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE,
    BluetoothSerial,
    Diagnostic,
    GlobalProvider
  ]
})
export class AppModule {
  
}
