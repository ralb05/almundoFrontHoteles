import {Component, OnInit} from '@angular/core';
import {Hotels} from '../_models/hotels';
import {HotelsService} from '../_services/hotels.service';
import {Subscription} from 'rxjs';

@Component({
             selector: 'app-list',
             templateUrl: './list.component.html',
             styleUrls: ['./list.component.css']
           })
export class ListComponent implements OnInit {

  allHotels: Array<Hotels>;
  hotels: Array<Hotels>;
  Math: any;
  subscriptionName: Subscription;
  subscriptionStars: Subscription;
  name: string;
  stars: Array<number>;

  constructor(private hotelsService: HotelsService) {
    this.subscriptionName = this.hotelsService.getName()
    .subscribe( r => {
      this.name = r;
      this.getFilters();
    });
    this.subscriptionStars = this.hotelsService.getStars()
    .subscribe(r => {
      this.stars = r;
      this.getFilters();
    });
  }

  ngOnInit(): void {
    this.Math = Math;
    this.getHotels();
  }

  getHotels(): void {
    this.hotelsService.getHotels()
    .subscribe(hotels => {
      this.allHotels = hotels;
      this.hotels = hotels;
    });
  }

  getFilters(): void {
    this.hotels = this.allHotels.slice(0);
    if (this.name && this.name.length > 0) {
      this.hotels = this.hotels.filter(fil => {
        return fil.name.toLowerCase().search(this.name.toLowerCase().trim()) >= 0;
      });
    }
    if (this.stars && this.stars.length > 0) {
      this.hotels = this.hotels.filter(filter =>{
        return this.stars.indexOf(filter.stars) >= 0;
      });
    }
  }

  /*
   getHotelByName ( name: string ) {
   this.hotelService.getHotelByName(name).subscribe(hotels => {this.hotels = hotels;})
   }

   getHotelsByStars ( optionsQuery ) {
   this.hotelService.getHotelsByStars(optionsQuery).subscribe(hotels => {this.hotels = hotels;})
   }*/

  intToArray(stars: number): Array<number> {
    return new Array(stars);
  }

  ngOnDestroy() : void {
    // unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
    this.subscriptionStars.unsubscribe();
  }

}
