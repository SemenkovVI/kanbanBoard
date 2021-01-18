import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Lazy,
} from 'swiper/core';
import { Title } from '../title';
import { CRUDServiceService } from '../services/crudservice.service';

SwiperCore.use([Virtual, Lazy, Pagination, Navigation]);

@Component({
  selector: 'app-mobile-board',
  templateUrl: './mobile-board.component.html',
  styleUrls: ['./mobile-board.component.scss'],
})
export class MobileBoardComponent {
  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);

  @Input() titles: Title[] = [];

  constructor(private crudService: CRUDServiceService) {}

  ngOnInit() {}

  clickk() {
    console.log(this.titles);
  }

  // title = 'ng-swiper-demo';

  // slideData = [
  //   {
  //     id:
  //       'https://static9.depositphotos.com/1594308/1110/i/600/depositphotos_11107478-stock-photo-fantasy.jpg',
  //     name: 'Metal bluetooth cyan',
  //   },
  //   {
  //     id: 822,
  //     name: 'Avon',
  //   },
  //   {
  //     id: 159,
  //     name: 'Infrastructures',
  //   },
  //   {
  //     id: 424,
  //     name: 'Users Cotton',
  //   },
  //   {
  //     id: 572,
  //     name: 'Haptic Oklahoma Jewelery',
  //   },
  //   {
  //     id: 127,
  //     name: 'Circles Integration Street',
  //   },
  //   {
  //     id: 1009,
  //     name: 'uniform Communications Tuna',
  //   },
  //   {
  //     id: 619,
  //     name: 'North Carolina',
  //   },
  //   {
  //     id: 716,
  //     name: 'Eyeballs Rubber',
  //   },
  //   {
  //     id: 382,
  //     name: 'Nevada green unleash',
  //   },
  // ];

  // config: SwiperOptions = {
  //   pagination: { el: '.swiper-pagination', clickable: true },
  //   autoHeight: true,
  //   allowTouchMove: true,
  //   // centeredSlides: true,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   loop: true,
  // };

  // onSwiper(swiper: any) {
  //   console.log(swiper);
  // }
  //
  // onSlideChange() {
  //   console.log('slide change');
  // }
}
