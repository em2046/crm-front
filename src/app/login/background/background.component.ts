import { Component, OnInit } from '@angular/core';
import Utils from '../../../utils/utils';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.less'],
})
export class BackgroundComponent implements OnInit {
  icons;
  iconStyles;

  constructor() {
  }

  ngOnInit() {
    this.icons = [
      'local_play',
      'local_airport',
      'local_offer',
      'restaurant',
      'train',
      'cloud',
    ];
    const len = this.icons.length;
    const iconStyles = [];
    for (let i = 0; i < len; i++) {
      iconStyles.push(this.getIconStyles(i));
    }
    this.iconStyles = iconStyles;
  }

  getIconStyles(index) {
    const len = this.icons.length;
    const { randomRange } = Utils;

    const leftSide = randomRange(5, 25);
    const rightSide = randomRange(75, 95);
    const fullWidth = index < len / 2 ? leftSide : rightSide;
    const fullHeight = randomRange(5, 95);
    const iconSize = randomRange(4, 8);
    const halfSize = iconSize / 2;
    const angle = randomRange(-22.5, 22.5);

    return {
      'font-size': `${halfSize}vh`,
      width: `${iconSize}vh`,
      height: `${iconSize}vh`,
      'margin-left': `-${halfSize}vh`,
      'margin-top': `-${halfSize}vh`,
      transform: `translate(${fullWidth}vw, ${fullHeight}vh) rotate(${angle}deg)`,
    };
  }
}
