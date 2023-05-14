import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalogue-card',
  templateUrl: './catalogue-card.component.html',
  styleUrls: ['./catalogue-card.component.scss']
})
export class CatalogueCardComponent {

  @Input() services: any;

  calculateSavePercentage(originalPrice: number, discountPrice: number) {
    return Math.floor((originalPrice - discountPrice) / originalPrice * 100)
  }
}
