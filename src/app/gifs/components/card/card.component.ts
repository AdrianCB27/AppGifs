import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    if(!this.gif) throw new Error("Lol que mal")
  }

  @Input()
  public gif!:Gif;

}
