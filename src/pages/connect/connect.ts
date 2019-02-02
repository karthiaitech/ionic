import { Component, NgZone } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, LoadingController,Platform } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GlobalProvider } from "../../providers/global/global";


@IonicPage()

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})

export class ConnectPage {
  
  devices = [];
  grp = [];
  ConnectedStatus = "";
  isScanning = false;
  visability: boolean;
  isconnected: boolean;
  scanTimer: any;
  btnscan = "Start Scan";
  //  Device: any;
  device;

  ConnectedDevice: boolean;
  public isToggled: boolean;
  datas = []; //Writen/Received data to be shown
  loading: any;
  serviceuuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
  characteruuidwrite = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
  characteruuidread = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private diagnostic: Diagnostic,
    public ngZone: NgZone,
    public alertCtrl: AlertController,
    public ble: BLE,
    public global: GlobalProvider,
    public loadingController: LoadingController,
    public platform: Platform
    

  ) {
    this.isToggled = false;
  }

  ionViewDidLoad() {
    this.isconnected = false;
    this.diagnostic.getBluetoothState()
      .then((state) => {
        if (state == this.diagnostic.bluetoothState.POWERED_ON) {
          this.startScan()
        } else {
          this.alertCallNavigation("Error", "Please Turn on Blutooth connection!");
        }
      }).catch(e => this.scanError(e));
    console.log('ionViewDidLoad ConnectPage');
  
  }

  function2(device) {
    this.loading = this.loadingController.create({ content: "Connecting...", duration: 10000 });
    this.loading.present();
    this.global.deviceGlobel = device;
    console.log("get Id", JSON.stringify(this.global.deviceGlobel))
    this.device = device;
    this.connectDevice(this.device.id)

  }
 
  connectDevice(device) {
    this.ble.connect(device).subscribe(
      peripheralData => {
        this.loading.dismissAll();
        this.isconnected = true;
        console.log(this.device.id)
        for (let i = 0; i < this.devices.length; i++) {
          if (this.devices[i].id == this.device.id) {
            this.devices[i].status = "Conncted"
          }
        }
        if (this.device.name == undefined) {
          this.alertCallNavigation('Connected', 'Device Name : N/A')
        } else {
          this.alertCallNavigation('Connected', this.device.name)
        }
        console.log("Connect:" + JSON.stringify(peripheralData));
        this.global.PeribheraldataGlobel = peripheralData;
      },
      error => this.AlreadyConnecting()//console.log("Error Connecting" + JSON.stringify(error))
    );
  }
  AlreadyConnecting() {
    this.ConnectedDevice = true;
  }


  startScan() {
    if (this.isScanning) {
      this.btnscan = "Start Scan";
      this.isScanning = false;
      // this.ble.stopScan();
    } else {
      this.diagnostic.getBluetoothState()
        .then((state) => {
          if (state == this.diagnostic.bluetoothState.POWERED_ON) {
            this.loading = this.loadingController.create({ content: "Scanning", duration: 10000 });
            this.loading.present();
            this.isScanning = true;
            this.visability = false;
            this.devices = [];
            this.ble.startScan([]).subscribe(
              device => {
                device.status = "Not Connected";
                if (this.devices.findIndex((dev: any) => dev.id === device.id) == -1)
                  this.devices.push(device);
                error => this.scanError(error) ////If unable to scan device, it is called

              setTimeout(() => {
                  this.ble.stopScan().then(() => {
                  this.loading.dismissAll()
                  console.log("Scanning has stopped");
                  console.log(JSON.stringify(this.devices))
                  this.isScanning = false;
                  });
                  }, 10000);
              });
            console.log("Start_Scan_Pressed", this.devices);
            this.btnscan = "Stop Scan"
          } else {
            this.alertCallNavigation("Error", "Please Turn on Blutooth connection!");
          }
        }).catch(e => this.scanError(e));
    }
  }
  alertCallNavigation(title: string, Message: string) {
    let alert = this.alertCtrl.create({
      subTitle: title,
      message: Message,
      buttons: [
        {
          text: "Ok",
          role: 'cancel',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }]
    });

    alert.present();
  }
  notify() {
    console.log("Toggled: " + this.isToggled);
    if (!this.isToggled) {
      console.log("Toggledfalse: " + this.isToggled);
    } else {
      this.diagnostic.switchToBluetoothSettings();
      console.log("Toggledtrue: " + this.isToggled);
      if (this.isToggled === true) {

      }
    }
  }
  scanError(error: any) {
    this.ble.stopScan();
    // clearTimeout(this.scanTimer);
    this.isScanning = false;
    this.alertCallNavigation("Error", "Error in connection!");
  }
  // ionViewWillLeave() {//Disconnect device when user back to other page
  //   this.ble.disconnect(this.device.id);
  // }
}
