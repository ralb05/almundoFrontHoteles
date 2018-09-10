import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Hotels} from '../_models/hotels';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private apiUrl : string;
  private subjectName = new Subject<any>();
  private subjectStars = new Subject<any>();

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000';
  }

  sendFilterName(hotelName: string) {
    this.subjectName.next(hotelName);
  }

  sendFilterStars(stars: Array<number>) {
    this.subjectStars.next(stars);
  }

  getHotels(): Observable<Array<Hotels>> {
    return this.http.get<Array<Hotels>>(this.apiUrl);
  }

  getName(): Observable<any> {
    return this.subjectName.asObservable();
  }

  getStars(): Observable<any> {
    return this.subjectStars.asObservable();
  }

}
