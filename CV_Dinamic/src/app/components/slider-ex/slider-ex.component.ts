import { Component, ViewChild } from '@angular/core';
import { NgbCarousel,NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider-ex',
  templateUrl: './slider-ex.component.html',
  styleUrls: ['./slider-ex.component.scss']
})
export class SliderExComponent {

  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  
  expIT: any[] = [
    {empresa: 'Demisa Construcciones S.A.',
    img:'/assets/images/1.jpg',
    desc:'Érase una vez, truz'
    },
    {empresa: 'Demisa Construcciones S.A.',
    img:'/assets/images/2.jpg',
    desc:'Érase dos vez, truz'
    },
    {empresa: 'Demisa Construcciones S.A.',
    img:'/assets/images/3.jpg',
    desc:'Érase tres vez, truz'
    }

  ]
  paused = true;
  
  constructor(private _config: NgbCarouselConfig){
    
    _config.interval = 60000;
    _config.pauseOnHover = true;
    _config.pauseOnFocus = true;
    _config.animation = true;
    //this.ngCarousel.cycle();



  }

}
