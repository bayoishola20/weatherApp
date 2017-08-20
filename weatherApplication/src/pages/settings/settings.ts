import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city: string;
  state: string;
  country: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
    
      this.storage.get('place').then((data) => {
        if(data != null){
          let place = JSON.parse(data);
          this.city = place.city;
          this.state = place.state;
          this.country = place.country;
        } else {
          this.city = "Abuja";
          this.state = "FC";
          this.country = "NI";
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm(){
    let place = {
      city: this.city,
      state: this.state,
      country: this.country,
    }
    this.storage.set('place', JSON.stringify(place));
    this.navCtrl.push(HomePage);
  }

}
