import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GlobalProvider } from "../../providers/global/global";
import { BLE } from '@ionic-native/ble';
/**
 * Generated class for the ControlscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-controlscreen',
  templateUrl: 'controlscreen.html',
})
export class ControlscreenPage {

  serviceuuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
  characteruuidwrite = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
  characteruuidread = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  Toggle_Switch_1: number;
  Toggle_Switch_2: number;
  Unit_State: number;
  Phase_Delay: number;
  Flash_Time_Top: number;
  Flash_Time_Bottom: number;
  Intencity_Flash_Top: number;
  Intencity_Flash_Bottom: number;
  Intencity_Continous_Top: number;
  Intencity_Continous_Bottom: number;
  Battery_Warning_Level_1: number;
  Battery_Warning_Level_2: number;
  loading: any;
  flag: boolean;
  device;
  datas = []; //Writen/Received data to be shown
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private diagnostic: Diagnostic,
    public alertCtrl: AlertController,
    public global: GlobalProvider,
    public ble: BLE,
    public ngZone: NgZone,
    public loadingController: LoadingController,


  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
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
            console.log("fskdjf", this.global.PeribheraldataGlobel)
            console.log("1234", DeviceGet)
          }
        } else {
          this.alertCall("Alert", "Please Turn on Blutooth connection!");
        }
      }).catch(e => this.scanError(e));
  }

  NextBtn() {
    // this.CallReadService()
    this.ConnectParsingData()
  }

  ConnectParsingData() {

    let Toggle1 = this.Toggle_Switch_1
    let Toggle2 = this.Toggle_Switch_2
    let Unit = this.Unit_State
    let Phase = this.Phase_Delay
    let FlashTop = this.Flash_Time_Top
    let FlashBottom = this.Flash_Time_Bottom
    let IntencityFlasTop = this.Intencity_Flash_Top
    let IntencityFlashBottom = this.Intencity_Flash_Bottom
    let ContinueTop = this.Intencity_Continous_Top
    let ContinueBottom = this.Intencity_Continous_Bottom
    let Battery1 = this.Battery_Warning_Level_1
    let Battery2 = this.Battery_Warning_Level_2

    let Tog1 = String(Toggle1)
    let Tog2 = String(Toggle2)
    let Unitenumber = String(Unit)
    let PhaseNumber = String(Phase)
    let FlashTopNumber = String(FlashTop)
    let FlashBottomnumber = String(FlashBottom)
    let IntencityFlasTopNumber = String(IntencityFlasTop)
    let IntencityFlashBottomNumber = String(IntencityFlashBottom)
    let ContinueTopNumber = String(ContinueTop)
    let ContinueBottomNumber = String(ContinueBottom)
    let Battery1Number = String(Battery1)
    let Battery2Number = String(Battery2)

    if (String(Toggle1) != 'undefined' && isNaN(Toggle1)) {
      this.WarningAlert("Value must be an Number", String(Toggle1))
    } else if (String(Toggle2) != 'undefined' && isNaN(Toggle2)) {
      this.WarningAlert("Value must be an Number", String(Toggle2))
    } else if (String(Unit) != 'undefined' && isNaN(Unit)) {
      this.WarningAlert("Value must be an Number", String(Unit))
    } else if (String(Phase) != 'undefined' && isNaN(Phase)) {
      this.WarningAlert("Value must be an Number", String(Phase))
    } else if (String(FlashTop) != 'undefined' && isNaN(FlashTop)) {
      this.WarningAlert("Value must be an Number", String(FlashTop))
    } else if (String(FlashBottom) != 'undefined' && isNaN(FlashBottom)) {
      this.WarningAlert("Value must be an Number", String(FlashBottom))
    } else if (String(IntencityFlasTop) != 'undefined' && isNaN(IntencityFlasTop)) {
      this.WarningAlert("Value must be an Number", String(IntencityFlasTop))
    } else if (String(IntencityFlashBottom) != 'undefined' && isNaN(IntencityFlashBottom)) {
      this.WarningAlert("Value must be an Number", String(IntencityFlashBottom))
    } else if (String(ContinueTop) != 'undefined' && isNaN(ContinueTop)) {
      this.WarningAlert("Value must be an Number", String(ContinueTop))
    } else if (String(ContinueBottom) != 'undefined' && isNaN(ContinueBottom)) {
      this.WarningAlert("Value must be an Number", String(ContinueBottom))
    } else if (String(Battery1) != 'undefined' && isNaN(Battery1)) {
      this.WarningAlert("Value must be an Number", String(Battery1))
    } else if (String(Battery2) != 'undefined' && isNaN(Battery2)) {
      this.WarningAlert("Value must be an Number", String(Battery2))
    }
    else if
      (((Tog1 != 'undefined') && (Tog1 != "")) || ((Tog2 != 'undefined') && (Tog2 != ""))
      || (Unitenumber != 'undefined') || (PhaseNumber != 'undefined')
      || (FlashTopNumber != 'undefined') || (FlashBottomnumber != 'undefined')
      || (IntencityFlasTopNumber != 'undefined') || (IntencityFlashBottomNumber != 'undefined')
      || (ContinueTopNumber != 'undefined') || (ContinueBottomNumber != 'undefined')
      || (Battery1Number != 'undefined') || (Battery2Number != 'undefined')) {
      if ((Tog1 != 'undefined') && (Tog1 != "")) {
        this.CallService(1, Tog1)
      }
      if ((Tog2 != 'undefined') && (Tog2 != "")) {
        this.CallService(2, Tog2)
      }
      if ((Unitenumber != 'undefined') && (Unitenumber != "")) {
        this.CallService(3, Unitenumber)
      }
      if ((PhaseNumber != 'undefined') && (PhaseNumber != "")) {
        this.CallService(4, PhaseNumber)
      }
      if ((FlashTopNumber != 'undefined') && (FlashTopNumber != "")) {
        this.CallService(5, FlashTopNumber)
      }
      if ((FlashBottomnumber != 'undefined') && (FlashBottomnumber != "")) {
        this.CallService(6, FlashBottomnumber)
      }
      if ((IntencityFlasTopNumber != 'undefined') && (IntencityFlasTopNumber != "")) {
        this.CallService(7, IntencityFlasTopNumber)
      }
      if ((IntencityFlashBottomNumber != 'undefined') && (IntencityFlashBottomNumber != "")) {
        this.CallService(8, IntencityFlashBottomNumber)
      }
      if ((ContinueTopNumber != 'undefined') && (ContinueTopNumber != "")) {
        this.CallService(9, ContinueTopNumber)
      }
      if ((ContinueBottomNumber != 'undefined') && (ContinueBottomNumber != "")) {
        this.CallService(10, ContinueBottomNumber)
      }
      if ((Battery1Number != 'undefined') && (Battery1Number != "")) {
        this.CallService(11, Battery1Number)
      }
      if ((Battery2Number != 'undefined') && (Battery2Number != "")) {
        this.CallService(12, Battery2Number)
      }

    } else {
      this.WarningAlert("Warning", "Must be present all fields")
    }
  }
  CallService(positions: number, GetValue: String) {
    console.log("pos" + positions, "Val" + GetValue)
    let State = {
      "write_attributes_member": [positions, GetValue],
    }
    var bytedata = this.toUTF8Array(JSON.stringify(State) + '\r\n');
    var mData = new Uint8Array(bytedata);
    for (const item of this.global.PeribheraldataGlobel.characteristics) {
      console.log("Our Parsed Data : " + JSON.stringify(item));
    }
    let b = this.global.PeribheraldataGlobel.characteristics[4];
    console.log(JSON.stringify(b))
    let Serviceuuid = b["service"]
    let charaterstics = b["characteristic"]
    console.log(this.global.PeribheraldataGlobel.id);
    console.log(Serviceuuid);
    console.log(charaterstics);
    this.ble.writeWithoutResponse(this.global.PeribheraldataGlobel.id, Serviceuuid, charaterstics, mData.buffer).then(result => {
      console.log("Response", result)
      this.ngZone.run(() => {
        this.datas.push("Write -> " + JSON.stringify(State));
      });
    }).catch(error => this.alertCall("Error", "Try again later!"))
  }

  //   this.ble.startNotification(this.global.PeribheraldataGlobel.id, Serviceuuid, charaterstics).subscribe(result => {
  //     console.log("Notification:" + String.fromCharCode.apply(Notification, new Uint8Array(result)));
  //     this.ble.writeWithoutResponse(this.global.PeribheraldataGlobel.id, Serviceuuid, charaterstics, mData).then(result => {
  //       //console.log("READ:" + String.fromCharCode.apply(null, new Uint8Array(data)));
  //       console.log("Response Data:" + result);
  //     }, function (error) {
  //       console.log("Error Read" + JSON.stringify(error));
  //     });
  //   }, function (error) {
  //     console.log("Error Notification" + JSON.stringify(error));
  //   });
  // }
  //   this.ble.startNotification(this.global.PeribheraldataGlobel.id, Serviceuuid, charaterstics).subscribe(m => {
  //     var data = new Uint8Array(m);
  //     console.log(JSON.stringify(data));
  //     console.log("1234567", data)
  //     this.ngZone.run(() => {
  //       status = "Notification"

  //     });
  //   })
  // }
  //this.data = JSON.stringify(p);

  //   this.ble.write(this.device.id, this.serviceuuid, this.characteruuidwrite, mData.buffer).then(result => {

  //     this.ngZone.run(() => {
  //       this.datas.push("Write -> " + JSON.stringify(State));
  //     });
  //   }).catch(error =>this.alertCall("Error", "Try again later!"))
  // }
  CallReadService() {
    let State = {
      "read_attributes_member": "3",
    }
    var bytedata = this.toUTF8Array(JSON.stringify(State) + '\r\n');
    var mData = new Uint8Array(bytedata);
    // this.ble.read(this.device.id, this.serviceuuid, this.characteruuidread).then(result => {
    //   console.log("Response:",result)
    //   this.ngZone.run(() => { 
    //     this.datas.push("Write -> " + JSON.stringify(State));
    //   });
    // }).catch(error =>console.log("sadfsa"))

    this.ble.read(this.device.id, this.serviceuuid, this.characteruuidread).then(result => {
      console.log("Response:", result)
      this.ngZone.run(() => {
        this.datas.push("Write -> " + JSON.stringify(State));
      });
    }).catch(error => console.log("sadfsa"))
  }
  setFocus(nextElement) {
    nextElement.setFocus();
  }
  RootPage() {
    this.navCtrl.popToRoot()
  }
  onEnter() {
    console.log("Key")
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

  WarningAlert(title: string, Message: string) {
    let alert = this.alertCtrl.create({
      subTitle: title,
      message: Message,
      buttons: [
        {
          text: "Ok",
          role: 'cancel',
          handler: () => {
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
  scanError(error: any) {
    this.alertCall("Error", "Try again later!");
  }


}
