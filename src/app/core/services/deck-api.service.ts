import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, Deck } from '../interfaces/deck-interface';

@Injectable({
  providedIn: 'root'
})
export class DeckAPIService {

  private url = 'https://deckofcardsapi.com/api/deck/'

  constructor( private http: HttpClient ) { }

  public get_deck(): Observable<Deck> {
    return this.http.get<Deck>(`${this.url}new/shuffle/?deck_count=6`);
  }

  public suffle_deck(id:string): Observable<Deck> {
    return this.http.get<Deck>(`${this.url}${id}/shuffle/?remaining=true`);
  }

  public draw_Card(id:string, numberOfCards:number):Observable<Card>{
    return this.http.get<Card>(`${this.url}${id}/draw/?count=${numberOfCards}`);
  }
}
