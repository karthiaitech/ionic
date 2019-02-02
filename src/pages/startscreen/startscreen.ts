import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { ControlscreenPage } from '../controlscreen/controlscreen';
import { ConnectPage } from '../connect/connect';

@IonicPage()
@Component({
  selector: 'page-startscreen',
  templateUrl: 'startscreen.html',
})
export class StartscreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartscreenPage');
  }
  InfoPagetoGO() {
    this.navCtrl.push(ListPage);
  }
  controlpage() {
    console.log("promani")
    this.navCtrl.push(ControlscreenPage);
  }
  Connect_to_page() {
    this.navCtrl.push(ConnectPage);
  }

}
