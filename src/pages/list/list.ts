import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GlobalProvider } from "../../providers/global/global";
import { BLE } from '@ionic-native/ble';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  device;
  devices = [];
  datas = []; //Writen/Received data to be shown
  loading: any;
  serviceuuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
  characteruuidwrite = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
  characteruuidread = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private diagnostic: Diagnostic,
      public alertCtrl: AlertController,
      public global: GlobalProvider,
      public ble: BLE,
      public ngZone: NgZone
      ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.diagnostic.getBluetoothState()
      .then((state) => {
        if (state == this.diagnostic.bluetoothState.POWERED_ON) {
          let DeviceGet = this.global.deviceGlobel;
          let b = String(DeviceGet)
          console.log("Str", b)
          if (b == 'undefined') {
            this.alertCall("Warning", "Please Connect UART device Please!!");
          } else {
            this.device = this.global.deviceGlobel;
            console.log("1234", DeviceGet)
            this.CallService()
          }
        } else {
          this.alertCall("Error", "Please Turn on Blutooth connection!");
        }
      }).catch(e => this.scanError(e));
  }
  CallService() {
    console.log("Val" + "GetValue")
    let State = {
      "read_states_count": "?"
      // "read_states_member":  GetValue,
    }
    var bytedata = this.toUTF8Array(JSON.stringify(State) + '\r\n');
    var mData = new Uint8Array(bytedata);
    this.ble.write(this.device.id, this.serviceuuid, this.characteruuidwrite, mData.buffer).then(
      res => {
      this.ngZone.run(() => {
        console.log("get"+JSON.stringify(res))
        this.datas.push("Write -> " + JSON.stringify(State));
      });
    }).catch(error => this.alertCall("Error", "Try again later!"))
  }
   
  NextBtn() {
    //let dev = this.navParams.get('Data')
    //  this.navCtrl.push(HomePage,{Data : dev});
    this.navCtrl.popToRoot();
  }
  alertCall(title: string, Message: string) {
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
  toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }
  arrayBufferToString(buffer) { //
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if (/[\u0080-\uffff]/.test(str)) {
      throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
  }
  scanError(error) {
    this.alertCall("Error", "Please Turn on Blutooth connection!");
  }

}
