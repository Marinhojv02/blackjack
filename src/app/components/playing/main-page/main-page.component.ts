import { Deck, cards, Card } from './../../../core/interfaces/deck-interface';
import { Component, OnInit } from '@angular/core';
import { DeckAPIService } from 'src/app/core/services/deck-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit{

  public deck!:Deck;

  public Dealer: {cards:cards[], pontuacao:number, finished: boolean} = {
    cards: [],
    pontuacao: 0,
    finished: false
  };

  public Player: {cards:any[], pontuacao:number, finished: boolean} = {
    cards: [],
    pontuacao: 0,
    finished: false
  };

  constructor(private deckAPI:DeckAPIService){}

  ngOnInit(): void {
    this.newDeck()
  }

  public newDeck(){
    this.deckAPI.get_deck().subscribe({
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
    this.deckAPI.suffle_deck(this.deck.deck_id)

    this.Dealer = {cards:[], pontuacao: 0, finished:false}
    this.Player = {cards:[], pontuacao: 0, finished:false}

    this.drawCard(2, 'player')
    this.drawCard(2, 'dealer')
  }

  public drawCard(numberOfCards:number, WhosPlaying:string){
    this.deckAPI.draw_Card(this.deck.deck_id, numberOfCards).subscribe({
      next: (res) => {
        if( WhosPlaying == "player"){
          res.cards.forEach(card => {
            this.Player.cards.push(card)
          })
          this.count_points()
        }
        else if( WhosPlaying == "dealer"){
          res.cards.forEach(card => {
            this.Dealer.cards.push(card)
          })
          this.count_points()
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  public stop(){
    this.Player.finished = true
  }

  public count_points(){
    this.Player.pontuacao = 0
    this.Dealer.pontuacao = 0

    const NotIntegerCards = ['ACE', 'JACK', 'QUEEN', 'KING']
    this.Player.cards.forEach(card => {
      if(NotIntegerCards.includes(card.value)){
        this.Player.pontuacao += 10
      }else{
        this.Player.pontuacao += Number(card.value)
      }

      if(this.Player.pontuacao >= 21){
        this.Player.finished = true
      }

    })

    this.Dealer.cards.forEach(card => {
      if(NotIntegerCards.includes(card.value)){
        this.Dealer.pontuacao += 10
      }else{
        this.Dealer.pontuacao += Number(card.value)
      }

      if(this.Dealer.pontuacao >= 17){
        this.Dealer.finished = true
      }

    })

    if(this.Player.finished == true && this.Dealer.finished == false){
      this.drawCard(1, 'dealer')
    }

    console.log(this.Player)
    console.log(this.Dealer)
  }


}
