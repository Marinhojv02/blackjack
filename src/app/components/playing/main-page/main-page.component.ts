import { Deck, cards } from './../../../core/interfaces/deck-interface';
import { Component, OnInit } from '@angular/core';
import { DeckAPIService } from 'src/app/core/services/deck-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

  public deck!:Deck;

  public Dealer: {cards:cards[], pontuacao:number} = {
    cards: [],
    pontuacao: 0
  };
  public Player: {cards:cards[], pontuacao:number} = {
    cards: [],
    pontuacao: 0
  };

  constructor(private deckAPI:DeckAPIService){}

  ngOnInit(): void {
    this.newDeck()
  }

  public drawCard(numberOfCards:number, WhosPlaying:string){
    this.deckAPI.draw_Card(this.deck.deck_id, numberOfCards).subscribe({
      next: (res) => {
        console.log(res);
        if( WhosPlaying == "player"){
          this.Player.cards.push(res.cards)
          console.log(this.Player)
        }
        else if( WhosPlaying == "dealer"){
          this.Dealer.cards.push(res.cards)
          console.log(this.Dealer)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  public newDeck(){
    this.deckAPI.getDeck().subscribe({
      next: (res:Deck) => {
        this.deck = res
        console.log(this.deck)
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  public onStart(){
    this.Dealer = {cards:[], pontuacao: 0}
    this.Player = {cards:[], pontuacao: 0}
    this.drawCard(2, 'player')
    this.drawCard(2, 'dealer')
  }

  public pointCounter() {
    this.Player.cards.forEach(element => {
      if(element.cards){

      }
    });
  }
}
