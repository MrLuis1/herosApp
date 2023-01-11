import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input() hero!:Heroes;

  constructor() { }

  ngOnInit(): void {

  }

  

}
