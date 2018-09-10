import {Injectable} from '@angular/core';

@Injectable()
export class Hotels {

  public id: string;
  public name: string;
  public stars: number;
  public price: number;
  public image: string;
  public amenities: Array<string>;

}
