import { Component, OnInit } from '@angular/core';
import {HotelsService} from '../_services/hotels.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  toggleSearch: boolean;
  toggleStars: boolean;
  toggleFiltersMobile: boolean;
  allChecked: boolean = true;
  optionsStar = [];
  options = [
    {name:'5', value:5, checked:false},
    {name:'4', value:4, checked:false},
    {name:'3', value:3, checked:false},
    {name:'2', value:2, checked:false},
    {name:'1', value:1, checked:false}
    ];
  hotelName: string;
  constructor(private hotelsService: HotelsService) {
    this.toggleSearch = true;
    this.toggleStars = true;
    this.toggleFiltersMobile = false;
  }

  ngOnInit(): void {
  }
  changeStart(all: boolean = false): void {
    this.optionsStar = [];
    if (all !== true) {
      this.allChecked = false;
      const selectedValues = this.options.filter(r => r.checked === true);
      selectedValues.map(s => {
        this.optionsStar.push(s.value);
      });
    } else {
      this.options.map(o => o.checked = false);
    }
    this.sendFilterStars();
  }

  sendFilterName(): void {
    this.hotelsService.sendFilterName(this.hotelName);
  }

  sendFilterStars(): void {
    this.hotelsService.sendFilterStars(this.optionsStar);
  }

  intToArray(stars: number): Array<number> {
    return new Array(stars);
  }
}
