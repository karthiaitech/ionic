webpackJsonp([4],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConnectPage = /** @class */ (function () {
    function ConnectPage(navCtrl, navParams, diagnostic, ngZone, alertCtrl, ble, global, loadingController, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.diagnostic = diagnostic;
        this.ngZone = ngZone;
        this.alertCtrl = alertCtrl;
        this.ble = ble;
        this.global = global;
        this.loadingController = loadingController;
        this.platform = platform;
        this.devices = [];
        this.grp = [];
        this.ConnectedStatus = "";
        this.isScanning = false;
        this.btnscan = "Start Scan";
        this.datas = []; //Writen/Received data to be shown
        this.serviceuuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
        this.characteruuidwrite = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
        this.characteruuidread = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
        this.isToggled = false;
    }
    ConnectPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.isconnected = false;
        this.diagnostic.getBluetoothState()
            .then(function (state) {
            if (state == _this.diagnostic.bluetoothState.POWERED_ON) {
                _this.startScan();
            }
            else {
                _this.alertCallNavigation("Error", "Please Turn on Blutooth connection!");
            }
        }).catch(function (e) { return _this.scanError(e); });
        console.log('ionViewDidLoad ConnectPage');
    };
    ConnectPage.prototype.function2 = function (device) {
        this.loading = this.loadingController.create({ content: "Connecting...", duration: 10000 });
        this.loading.present();
        this.global.deviceGlobel = device;
        console.log("get Id", JSON.stringify(this.global.deviceGlobel));
        this.device = device;
        this.connectDevice(this.device.id);
    };
    ConnectPage.prototype.connectDevice = function (device) {
        var _this = this;
        this.ble.connect(device).subscribe(function (peripheralData) {
            _this.loading.dismissAll();
            _this.isconnected = true;
            console.log(_this.device.id);
            for (var i = 0; i < _this.devices.length; i++) {
                if (_this.devices[i].id == _this.device.id) {
                    _this.devices[i].status = "Conncted";
                }
            }
            if (_this.device.name == undefined) {
                _this.alertCallNavigation('Connected', 'Device Name : N/A');
            }
            else {
                _this.alertCallNavigation('Connected', _this.device.name);
            }
            console.log("Connect:" + JSON.stringify(peripheralData));
            _this.global.PeribheraldataGlobel = peripheralData;
        }, function (error) { return _this.AlreadyConnecting(); } //console.log("Error Connecting" + JSON.stringify(error))
        );
    };
    ConnectPage.prototype.AlreadyConnecting = function () {
        this.ConnectedDevice = true;
    };
    ConnectPage.prototype.startScan = function () {
        var _this = this;
        if (this.isScanning) {
            this.btnscan = "Start Scan";
            this.isScanning = false;
            // this.ble.stopScan();
        }
        else {
            this.diagnostic.getBluetoothState()
                .then(function (state) {
                if (state == _this.diagnostic.bluetoothState.POWERED_ON) {
                    _this.loading = _this.loadingController.create({ content: "Scanning", duration: 10000 });
                    _this.loading.present();
                    _this.isScanning = true;
                    _this.visability = false;
                    _this.devices = [];
                    _this.ble.startScan([]).subscribe(function (device) {
                        device.status = "Not Connected";
                        if (_this.devices.findIndex(function (dev) { return dev.id === device.id; }) == -1)
                            _this.devices.push(device);
                        (function (error) { return _this.scanError(error); }); ////If unable to scan device, it is called
                        setTimeout(function () {
                            _this.ble.stopScan().then(function () {
                                _this.loading.dismissAll();
                                console.log("Scanning has stopped");
                                console.log(JSON.stringify(_this.devices));
                                _this.isScanning = false;
                            });
                        }, 10000);
                    });
                    console.log("Start_Scan_Pressed", _this.devices);
                    _this.btnscan = "Stop Scan";
                }
                else {
                    _this.alertCallNavigation("Error", "Please Turn on Blutooth connection!");
                }
            }).catch(function (e) { return _this.scanError(e); });
        }
    };
    ConnectPage.prototype.alertCallNavigation = function (title, Message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: title,
            message: Message,
            buttons: [
                {
                    text: "Ok",
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.popToRoot();
                    }
                }
            ]
        });
        alert.present();
    };
    ConnectPage.prototype.notify = function () {
        console.log("Toggled: " + this.isToggled);
        if (!this.isToggled) {
            console.log("Toggledfalse: " + this.isToggled);
        }
        else {
            this.diagnostic.switchToBluetoothSettings();
            console.log("Toggledtrue: " + this.isToggled);
            if (this.isToggled === true) {
            }
        }
    };
    ConnectPage.prototype.scanError = function (error) {
        this.ble.stopScan();
        // clearTimeout(this.scanTimer);
        this.isScanning = false;
        this.alertCallNavigation("Error", "Error in connection!");
    };
    ConnectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-connect',template:/*ion-inline-start:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\connect\connect.html"*/'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">\n\n<ion-header>\n    <ion-navbar>\n        <ion-title style="font-size:15px;text-align: center;">\n          CONNECT SCREEN\n        </ion-title>\n      </ion-navbar>\n</ion-header>\n<ion-content no-bounce padding >\n    <ion-list style="margin-bottom: 10px;">\n        <div class = "row" style="text-align: center; width: auto; height: 80px;">\n            <div class = "col col-60">  \n            <img src="/assets/imgs/two-pounds-logo-sm.png" style="height: 80px;">\n            </div>\n            <div class = "col col-40" style="color:#52BD8F;text-align: center; padding-top: 48px;"> Warning Lamp Units </div>\n        </div>   \n    </ion-list>\n  <ion-list style="width:90%;margin:0 5%;margin-bottom: 10px; ">   \n      <div class = "row" style="border: solid 2px #52BD8F;">\n          <div class = "col col-7" style="color:#52BD8F;text-align: center; border-right: solid 2px #52BD8F">Blutooth</div>\n           <!-- <div class = "col col-5" style="color:#fff;text-align: center;">On/Off</div>  -->\n           <div class = "col col-3 toggle-wrapper" style="color:#52BD8F;text-align: center; margin-bottom: 03%;padding: 10px;"><ion-toggle class="meds-toggle"\n            [(ngModel)]="isToggled" (ionChange)="notify()"> \n   </ion-toggle></div>\n      </div>\n  </ion-list>\n\n  <ion-list style="width:100%; height: auto; max-height:65%; overflow-x: hidden; overflow-y:auto;border: solid 2px #52BD8F;"> \n      <div class = "row" *ngFor="let item of devices"  style="border: solid 2px #52BD8F; margin-top: -2px; "  (click)="function2(item)">\n          <div class = "col col-7" style="color:#52BD8F; border-right: solid 2px #52BD8F; padding-left: 5%;">{{item.name == null ? item.id : item.name }}</div>\n          <div class = "col col-5" style="color:#fff;">{{item.status}}</div>\n      </div>  \n  </ion-list>\n<ion-footer padding class="footer">\n    <button ion-button block class = "button" (click)="startScan()">Re Scan</button>\n  </ion-footer>\n'/*ion-inline-end:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\connect\connect.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _j || Object])
    ], ConnectPage);
    return ConnectPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, diagnostic, alertCtrl, global, ble, ngZone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.ble = ble;
        this.ngZone = ngZone;
        this.devices = [];
        this.datas = []; //Writen/Received data to be shown
        this.serviceuuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
        this.characteruuidwrite = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
        this.characteruuidread = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
    }
    ListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ListPage');
        this.diagnostic.getBluetoothState()
            .then(function (state) {
            if (state == _this.diagnostic.bluetoothState.POWERED_ON) {
                var DeviceGet = _this.global.deviceGlobel;
                var b = String(DeviceGet);
                console.log("Str", b);
                if (b == 'undefined') {
                    _this.alertCall("Warning", "Please Connect UART device Please!!");
                }
                else {
                    _this.device = _this.global.deviceGlobel;
                    console.log("1234", DeviceGet);
                    _this.CallService();
                }
            }
            else {
                _this.alertCall("Error", "Please Turn on Blutooth connection!");
            }
        }).catch(function (e) { return _this.scanError(e); });
    };
    ListPage.prototype.CallService = function () {
        var _this = this;
        console.log("Val" + "GetValue");
        var State = {
            "read_states_count": "?"
            // "read_states_member":  GetValue,
        };
        var bytedata = this.toUTF8Array(JSON.stringify(State) + '\r\n');
        var mData = new Uint8Array(bytedata);
        this.ble.write(this.device.id, this.serviceuuid, this.characteruuidwrite, mData.buffer).then(function (res) {
            _this.ngZone.run(function () {
                console.log("get" + JSON.stringify(res));
                _this.datas.push("Write -> " + JSON.stringify(State));
            });
        }).catch(function (error) { return _this.alertCall("Error", "Try again later!"); });
    };
    ListPage.prototype.NextBtn = function () {
        //let dev = this.navParams.get('Data')
        //  this.navCtrl.push(HomePage,{Data : dev});
        this.navCtrl.popToRoot();
    };
    ListPage.prototype.alertCall = function (title, Message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: title,
            message: Message,
            buttons: [
                {
                    text: "Ok",
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.popToRoot();
                    }
                }
            ]
        });
        alert.present();
    };
    ListPage.prototype.toUTF8Array = function (str) {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80)
                utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
            else {
                i++;
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    };
    ListPage.prototype.arrayBufferToString = function (buffer) {
        var arr = new Uint8Array(buffer);
        var str = String.fromCharCode.apply(String, arr);
        if (/[\u0080-\uffff]/.test(str)) {
            throw new Error("this string seems to contain (still encoded) multibytes");
        }
        return str;
    };
    ListPage.prototype.scanError = function (error) {
        this.alertCall("Error", "Please Turn on Blutooth connection!");
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\list\list.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title style="font-size:15px;">\n          INFO SCREEN\n        </ion-title>\n      </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-list style="margin-bottom: 10px;">\n        <div class = "row" style="text-align: center; width: auto; height: 80px;">\n            <div class = "col col-60">  \n            <img src="/assets/imgs/two-pounds-logo-sm.png" style="height: 80px;">\n            </div>\n            <div class = "col col-40" style="color:#52BD8F;text-align: center; padding-top: 48px;"> Info </div>\n        </div>   \n    </ion-list>\n  <ion-list style="width:90%;margin:0 5%; margin-bottom: 10px;">   \n      <div class = "row" style="border: solid 2px #52BD8F;">\n          <div class = "col col-60" style="color:#52BD8F; text-align: center; border-right: solid 2px #52BD8F">Product Owner</div>\n          <div class = "col col-40" style="color:#fff;text-align: center;">Triopan</div>\n      </div>\n  </ion-list>\n  <ion-list style="width:90%;margin:0 5%;">     \n      <div class = "row" style="border: solid 2px #52BD8F; text-align: center; margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">unitUID:</div>\n          <div class = "col col-40" style="color:#fff;">aa-bb-cc-dd-ee-ff</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F; text-align: center; margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">productID:</div>\n          <div class = "col col-40" style="color:#fff;">777.901</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F; text-align: center; margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">companyName:</div>\n          <div class = "col col-40" style="color:#fff;"> Triopan AG</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F;text-align: center; margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">productName:</div>\n          <div class = "col col-40" style="color:#fff;">Fireball red</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F;text-align: center; margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">groupID:</div>\n          <div class = "col col-40" style="color:#fff;">xxxx</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F; text-align: center;margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">memberID:</div>\n          <div class = "col col-40" style="color:#fff;">X</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F; text-align: center;margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">batteryClass:</div>\n          <div class = "col col-40" style="color:#fff;">li-ion</div>\n      </div>\n      <div class = "row" style="border: solid 2px #52BD8F;text-align: center; margin-top: -2px;">\n          <div class = "col col-60" style="color:#52BD8F; border-right: solid 2px #52BD8F">batteryLevel:</div>\n          <div class = "col col-40" style="color:#fff;">x.xxx V</div>\n      </div>       \n  </ion-list>\n<ion-footer padding class="footer">\n    <button ion-button block class = "button" (click)="NextBtn()">Go to Start Screen</button>\n  </ion-footer>\n'/*ion-inline-end:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\list\list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartscreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_list__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controlscreen_controlscreen__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__connect_connect__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StartscreenPage = /** @class */ (function () {
    function StartscreenPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StartscreenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StartscreenPage');
    };
    StartscreenPage.prototype.InfoPagetoGO = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__list_list__["a" /* ListPage */]);
    };
    StartscreenPage.prototype.controlpage = function () {
        console.log("promani");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__controlscreen_controlscreen__["a" /* ControlscreenPage */]);
    };
    StartscreenPage.prototype.Connect_to_page = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__connect_connect__["a" /* ConnectPage */]);
    };
    StartscreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-startscreen',template:/*ion-inline-start:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\startscreen\startscreen.html"*/'\n<ion-content padding class="no-scroll">\n  <div class="LogoImage"></div>\n  <div padding class="iborti">\n  <div text-center style="font-weight: bold; font-size: 50px; color:#52BD8F;" > <h5>Warning Light Controller </h5></div> \n  <div style="border:solid 2px #52BD8F;padding: 2px;margin-top: 50px;">\n<div> <button ion-button block class = "button" (click)="Connect_to_page()">CONNECT SCREEN</button></div> \n<div> <button ion-button block class = "button" (click)="InfoPagetoGO()">INFO SCREEN</button></div> \n<div> <button ion-button block class = "button" (click)="controlpage()">CONTROL SCREEN</button></div> \n</div></div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\startscreen\startscreen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], StartscreenPage);
    return StartscreenPage;
}());

//# sourceMappingURL=startscreen.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlscreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ControlscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ControlscreenPage = /** @class */ (function () {
    function ControlscreenPage(navCtrl, navParams, diagnostic, alertCtrl, global, ble, ngZone, loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.ble = ble;
        this.ngZone = ngZone;
        this.loadingController = loadingController;
        this.serviceuuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
        this.characteruuidwrite = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
        this.characteruuidread = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
        this.datas = []; //Writen/Received data to be shown
    }
    ControlscreenPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad');
        this.diagnostic.getBluetoothState()
            .then(function (state) {
            if (state == _this.diagnostic.bluetoothState.POWERED_ON) {
                var DeviceGet = _this.global.deviceGlobel;
                var b = String(DeviceGet);
                console.log("Str", b);
                if (b == 'undefined') {
                    _this.alertCall("Warning", "Please Connect UART device Please!!");
                }
                else {
                    _this.device = _this.global.deviceGlobel;
                    console.log("fskdjf", _this.global.PeribheraldataGlobel);
                    console.log("1234", DeviceGet);
                }
            }
            else {
                _this.alertCall("Alert", "Please Turn on Blutooth connection!");
            }
        }).catch(function (e) { return _this.scanError(e); });
    };
    ControlscreenPage.prototype.NextBtn = function () {
        // this.CallReadService()
        this.ConnectParsingData();
    };
    ControlscreenPage.prototype.ConnectParsingData = function () {
        var Toggle1 = this.Toggle_Switch_1;
        var Toggle2 = this.Toggle_Switch_2;
        var Unit = this.Unit_State;
        var Phase = this.Phase_Delay;
        var FlashTop = this.Flash_Time_Top;
        var FlashBottom = this.Flash_Time_Bottom;
        var IntencityFlasTop = this.Intencity_Flash_Top;
        var IntencityFlashBottom = this.Intencity_Flash_Bottom;
        var ContinueTop = this.Intencity_Continous_Top;
        var ContinueBottom = this.Intencity_Continous_Bottom;
        var Battery1 = this.Battery_Warning_Level_1;
        var Battery2 = this.Battery_Warning_Level_2;
        var Tog1 = String(Toggle1);
        var Tog2 = String(Toggle2);
        var Unitenumber = String(Unit);
        var PhaseNumber = String(Phase);
        var FlashTopNumber = String(FlashTop);
        var FlashBottomnumber = String(FlashBottom);
        var IntencityFlasTopNumber = String(IntencityFlasTop);
        var IntencityFlashBottomNumber = String(IntencityFlashBottom);
        var ContinueTopNumber = String(ContinueTop);
        var ContinueBottomNumber = String(ContinueBottom);
        var Battery1Number = String(Battery1);
        var Battery2Number = String(Battery2);
        if (String(Toggle1) != 'undefined' && isNaN(Toggle1)) {
            this.WarningAlert("Value must be an Number", String(Toggle1));
        }
        else if (String(Toggle2) != 'undefined' && isNaN(Toggle2)) {
            this.WarningAlert("Value must be an Number", String(Toggle2));
        }
        else if (String(Unit) != 'undefined' && isNaN(Unit)) {
            this.WarningAlert("Value must be an Number", String(Unit));
        }
        else if (String(Phase) != 'undefined' && isNaN(Phase)) {
            this.WarningAlert("Value must be an Number", String(Phase));
        }
        else if (String(FlashTop) != 'undefined' && isNaN(FlashTop)) {
            this.WarningAlert("Value must be an Number", String(FlashTop));
        }
        else if (String(FlashBottom) != 'undefined' && isNaN(FlashBottom)) {
            this.WarningAlert("Value must be an Number", String(FlashBottom));
        }
        else if (String(IntencityFlasTop) != 'undefined' && isNaN(IntencityFlasTop)) {
            this.WarningAlert("Value must be an Number", String(IntencityFlasTop));
        }
        else if (String(IntencityFlashBottom) != 'undefined' && isNaN(IntencityFlashBottom)) {
            this.WarningAlert("Value must be an Number", String(IntencityFlashBottom));
        }
        else if (String(ContinueTop) != 'undefined' && isNaN(ContinueTop)) {
            this.WarningAlert("Value must be an Number", String(ContinueTop));
        }
        else if (String(ContinueBottom) != 'undefined' && isNaN(ContinueBottom)) {
            this.WarningAlert("Value must be an Number", String(ContinueBottom));
        }
        else if (String(Battery1) != 'undefined' && isNaN(Battery1)) {
            this.WarningAlert("Value must be an Number", String(Battery1));
        }
        else if (String(Battery2) != 'undefined' && isNaN(Battery2)) {
            this.WarningAlert("Value must be an Number", String(Battery2));
        }
        else if (((Tog1 != 'undefined') && (Tog1 != "")) || ((Tog2 != 'undefined') && (Tog2 != ""))
            || (Unitenumber != 'undefined') || (PhaseNumber != 'undefined')
            || (FlashTopNumber != 'undefined') || (FlashBottomnumber != 'undefined')
            || (IntencityFlasTopNumber != 'undefined') || (IntencityFlashBottomNumber != 'undefined')
            || (ContinueTopNumber != 'undefined') || (ContinueBottomNumber != 'undefined')
            || (Battery1Number != 'undefined') || (Battery2Number != 'undefined')) {
            if ((Tog1 != 'undefined') && (Tog1 != "")) {
                this.CallService(1, Tog1);
            }
            if ((Tog2 != 'undefined') && (Tog2 != "")) {
                this.CallService(2, Tog2);
            }
            if ((Unitenumber != 'undefined') && (Unitenumber != "")) {
                this.CallService(3, Unitenumber);
            }
            if ((PhaseNumber != 'undefined') && (PhaseNumber != "")) {
                this.CallService(4, PhaseNumber);
            }
            if ((FlashTopNumber != 'undefined') && (FlashTopNumber != "")) {
                this.CallService(5, FlashTopNumber);
            }
            if ((FlashBottomnumber != 'undefined') && (FlashBottomnumber != "")) {
                this.CallService(6, FlashBottomnumber);
            }
            if ((IntencityFlasTopNumber != 'undefined') && (IntencityFlasTopNumber != "")) {
                this.CallService(7, IntencityFlasTopNumber);
            }
            if ((IntencityFlashBottomNumber != 'undefined') && (IntencityFlashBottomNumber != "")) {
                this.CallService(8, IntencityFlashBottomNumber);
            }
            if ((ContinueTopNumber != 'undefined') && (ContinueTopNumber != "")) {
                this.CallService(9, ContinueTopNumber);
            }
            if ((ContinueBottomNumber != 'undefined') && (ContinueBottomNumber != "")) {
                this.CallService(10, ContinueBottomNumber);
            }
            if ((Battery1Number != 'undefined') && (Battery1Number != "")) {
                this.CallService(11, Battery1Number);
            }
            if ((Battery2Number != 'undefined') && (Battery2Number != "")) {
                this.CallService(12, Battery2Number);
            }
        }
        else {
            this.WarningAlert("Warning", "Must be present all fields");
        }
    };
    ControlscreenPage.prototype.CallService = function (positions, GetValue) {
        var _this = this;
        console.log("pos" + positions, "Val" + GetValue);
        var State = {
            "write_attributes_member": [positions, GetValue],
        };
        var bytedata = this.toUTF8Array(JSON.stringify(State) + '\r\n');
        var mData = new Uint8Array(bytedata);
        for (var _i = 0, _a = this.global.PeribheraldataGlobel.characteristics; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log("Our Parsed Data : " + JSON.stringify(item));
        }
        var b = this.global.PeribheraldataGlobel.characteristics[4];
        console.log(JSON.stringify(b));
        var Serviceuuid = b["service"];
        var charaterstics = b["characteristic"];
        console.log(this.global.PeribheraldataGlobel.id);
        console.log(Serviceuuid);
        console.log(charaterstics);
        this.ble.writeWithoutResponse(this.global.PeribheraldataGlobel.id, Serviceuuid, charaterstics, mData.buffer).then(function (result) {
            console.log("Response", result);
            _this.ngZone.run(function () {
                _this.datas.push("Write -> " + JSON.stringify(State));
            });
        }).catch(function (error) { return _this.alertCall("Error", "Try again later!"); });
    };
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
    ControlscreenPage.prototype.CallReadService = function () {
        var _this = this;
        var State = {
            "read_attributes_member": "3",
        };
        var bytedata = this.toUTF8Array(JSON.stringify(State) + '\r\n');
        var mData = new Uint8Array(bytedata);
        // this.ble.read(this.device.id, this.serviceuuid, this.characteruuidread).then(result => {
        //   console.log("Response:",result)
        //   this.ngZone.run(() => { 
        //     this.datas.push("Write -> " + JSON.stringify(State));
        //   });
        // }).catch(error =>console.log("sadfsa"))
        this.ble.read(this.device.id, this.serviceuuid, this.characteruuidread).then(function (result) {
            console.log("Response:", result);
            _this.ngZone.run(function () {
                _this.datas.push("Write -> " + JSON.stringify(State));
            });
        }).catch(function (error) { return console.log("sadfsa"); });
    };
    ControlscreenPage.prototype.setFocus = function (nextElement) {
        nextElement.setFocus();
    };
    ControlscreenPage.prototype.RootPage = function () {
        this.navCtrl.popToRoot();
    };
    ControlscreenPage.prototype.onEnter = function () {
        console.log("Key");
    };
    ControlscreenPage.prototype.alertCall = function (title, Message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: title,
            message: Message,
            buttons: [
                {
                    text: "Ok",
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.popToRoot();
                    }
                }
            ]
        });
        alert.present();
    };
    ControlscreenPage.prototype.WarningAlert = function (title, Message) {
        var alert = this.alertCtrl.create({
            subTitle: title,
            message: Message,
            buttons: [
                {
                    text: "Ok",
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    ControlscreenPage.prototype.toUTF8Array = function (str) {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80)
                utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
            else {
                i++;
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    };
    ControlscreenPage.prototype.arrayBufferToString = function (buffer) {
        var arr = new Uint8Array(buffer);
        var str = String.fromCharCode.apply(String, arr);
        if (/[\u0080-\uffff]/.test(str)) {
            throw new Error("this string seems to contain (still encoded) multibytes");
        }
        return str;
    };
    ControlscreenPage.prototype.scanError = function (error) {
        this.alertCall("Error", "Try again later!");
    };
    ControlscreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-controlscreen',template:/*ion-inline-start:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\controlscreen\controlscreen.html"*/'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">\n<ion-header>\n    <ion-navbar>\n        <ion-title style="font-size:15px;">\n            CONTROL SCREEN\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-list style="margin-bottom: 10px;">\n        <div class="row" style="text-align: center; width: auto; height: 80px;">\n            <div class="col col-60">\n                <img src="../../assets/imgs/two-pounds-logo-sm.png" style="height: 80px;">\n            </div>\n            <div class="col col-40" style="color:#52BD8F;text-align: center; padding-top: 48px;">Control</div>\n        </div>\n    </ion-list>\n    <ion-list style=" width:90%;margin:0 5%; margin-bottom: 10px;">\n        <div class="row" style="border: solid 2px #52BD8F;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Function</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">Value</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center; padding: 5px;">Selector</div>\n        </div>\n    </ion-list>\n    <ion-list style="margin-bottom: 10px;width:90%;margin:0 5%">\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div  class="col col-6" style="float:left; align-content: center; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Toggle\n                Switch 1</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">Continous\n                Top</div>\n            <div  class="col col-3 toggle-wrapper" style="color:#52BD8F;text-align: center; margin-bottom: 03%;padding: 10px;">\n                <ion-input [(ngModel)]="Toggle_Switch_1" type="number"  placeholder="Toggle Switch 1"  (keyup.enter)="setFocus(b)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Toggle\n                Switch 2</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">Rash\n                Bottom</div>\n            <div class="col col-3 toggle-wrapper" style="color:#52BD8F;text-align: center; margin-bottom: 03%;padding: 10px;">\n                <ion-input [(ngModel)]="Toggle_Switch_2" type="number" placeholder="Toggle Switch 2" #b (keyup.enter)="setFocus(c)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Unit\n                State</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px;">All Rashing</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Unit_State" type="number" placeholder="Unit State"  #c (keyup.enter)="setFocus(d)" ></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Phase\n                Delay</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">100MS</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Phase_Delay" type="number" placeholder="Phase Delay" #d (keyup.enter)="setFocus(e)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Flash-Time\n                Top</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">10%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Flash_Time_Top" type="number" placeholder="flash-Time Top"  #e (keyup.enter)="setFocus(f)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Flash-Time\n                Bottom</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">10%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Flash_Time_Bottom" type="number" placeholder="Flash-Time Bottom"  #f (keyup.enter)="setFocus(g)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Intencity\n                Flash Top</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">90%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Intencity_Flash_Top" type="number" placeholder="Intencity Flash Top"  #g (keyup.enter)="setFocus(h)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Intencity\n                Flash Bottom</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">90%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Intencity_Flash_Bottom" type="number" placeholder="Intencity Flash Bottom"  #h (keyup.enter)="setFocus(i)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Intencity\n                Continous Top </div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">10%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Intencity_Continous_Top" type="number" placeholder="Intencity Continous Top"  #i (keyup.enter)="setFocus(j)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Intencity\n                Continous Bottom</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">10%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Intencity_Continous_Bottom" type="number" placeholder="Intencity Continous Bottom"  #j (keyup.enter)="setFocus(k)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Battery\n                Warning Level 1</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">50%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Battery_Warning_Level_1" type="number" placeholder="Battery Warning Level 1"  #k (keyup.enter)="setFocus(l)"></ion-input>\n            </div>\n        </div>\n        <div class="row" style="border: solid 2px #52BD8F;margin-top: -2px;">\n            <div class="col col-6" style="float:left; text-align: center; color:#52BD8F; border-right: solid 2px #52BD8F; padding: 5px;">Battery\n                Warning Level 2</div>\n            <div class="col col-3" style="color:#52BD8F; text-align: center; border-right: solid 2px; padding: 5px;">20%</div>\n            <div class="col col-3" style="color:#52BD8F;text-align: center;">\n                <ion-input [(ngModel)]="Battery_Warning_Level_2" type="number" placeholder="Battery Warning Level 2"  #l></ion-input>\n            </div>\n        </div>\n    </ion-list>\n</ion-content>\n<ion-footer class="hide-on-keyboard-open" padding class="footer">\n    <button ion-button block class="button" (click)="NextBtn()">Send Data</button>\n    <button ion-button block class="button" (click)="RootPage()">Go to Start Screen</button>\n</ion-footer>'/*ion-inline-end:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\pages\controlscreen\controlscreen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ControlscreenPage);
    return ControlscreenPage;
}());

//# sourceMappingURL=controlscreen.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/connect/connect.module": [
		275,
		3
	],
	"../pages/controlscreen/controlscreen.module": [
		278,
		2
	],
	"../pages/list/list.module": [
		276,
		1
	],
	"../pages/startscreen/startscreen.module": [
		277,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_bluetooth_serial__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_global__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_list__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_startscreen_startscreen__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_controlscreen_controlscreen__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_connect_connect__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_startscreen_startscreen__["a" /* StartscreenPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_controlscreen_controlscreen__["a" /* ControlscreenPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_connect_connect__["a" /* ConnectPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {
                    scrollAssist: true,
                    autoFocusAssist: true
                }, {
                    links: [
                        { loadChildren: '../pages/connect/connect.module#ConnectPageModule', name: 'ConnectPage', segment: 'connect', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list/list.module#ListPageModule', name: 'ListPage', segment: 'list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/startscreen/startscreen.module#StartscreenPageModule', name: 'StartscreenPage', segment: 'startscreen', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/controlscreen/controlscreen.module#ControlscreenPageModule', name: 'ControlscreenPage', segment: 'controlscreen', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_startscreen_startscreen__["a" /* StartscreenPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_controlscreen_controlscreen__["a" /* ControlscreenPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_connect_connect__["a" /* ConnectPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__["a" /* BLE */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_8__providers_global_global__["a" /* GlobalProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_startscreen_startscreen__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_startscreen_startscreen__["a" /* StartscreenPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.hide();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\AIT-02\Desktop\ChangedIonic\ionic\Latest\WarningLampBLE\WarningLampBLE\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalProvider = /** @class */ (function () {
    function GlobalProvider() {
        console.log('Hello GlobalProvider Provider');
    }
    GlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], GlobalProvider);
    return GlobalProvider;
}());

//# sourceMappingURL=global.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map