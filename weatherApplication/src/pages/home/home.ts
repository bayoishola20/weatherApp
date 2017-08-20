import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherUndergroundProvider } from '../../providers/weather-underground/weather-underground';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  place: {
    city: string,
    state: string,
    country: string,
  }

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherUndergroundProvider,
              private storage: Storage,
              private toastCtrl: ToastController) {

  }

  ionViewWillEnter(){
    this.storage.get('place').then((val) => {
      if(val != null){
        this.place = JSON.parse(val);
      } else {
        this.place = {
          city: 'Abuja',
          state: 'FC',
          country: "NI",
        }
      }

      this.weatherProvider.getWeather(this.place.city, this.place.state).subscribe(weather => {
        // console.log(weather);
        this.weather = weather.current_observation;
      });

    });
  }

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.weatherProvider.updateWeather(refresher);

    setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Weather updated',
          duration: 2000,
          position: "top"
        });
        toast.present();
      }, 1000);
  }

}
