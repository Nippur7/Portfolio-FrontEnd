import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider-ed',
  templateUrl: './slider-ed.component.html',
  styleUrls: ['./slider-ed.component.scss']
})
export class SliderEdComponent implements OnInit{

  expIT: any[] = [
    {empresa: 'Demisa Construcciones S.A.',
    img:'/assets/images/1.jpg',
    desc:'Érase una vez, truz'
    },
    {empresa: 'Demisa Construcciones S.A.',
    img:'/assets/images/3.jpg',
    desc:'Érase dos vez, truz'
    },
    {empresa: 'Demisa Construcciones S.A.',
    img:'/assets/images/4.jpg',
    desc:'Érase tres vez, truz'
    }

  ]

  constructor(private _config:NgbCarouselConfig){
  }

  ngOnInit(): void {
    
  }

}
