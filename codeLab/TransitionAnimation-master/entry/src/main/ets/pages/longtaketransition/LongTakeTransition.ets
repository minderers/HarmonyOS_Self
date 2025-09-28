/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { util } from '@kit.ArkTS';
import { TitleBar } from '../../views/TitleBar';
import { LongTakeDetail } from './LongTakeDetail';

export interface Card {
  id: string;
  image: Resource;
  content: ResourceStr;
};

@Component
export struct CardView {
  @Prop card: Card;
  onCardClick: (card: Card) => void = () => {};

  build() {
    Column() {
      Image(this.card.image)
        .width('100%')
        .objectFit(ImageFit.Auto)
        .draggable(false)

      Column() {
        Text(this.card.content)
          .fontColor('rgba(0, 0, 0, 0.6)')
          .fontSize(14)
      }
      .padding(12)
    }
    .backgroundColor(Color.White)
    .size({ width: '100%' })
    .onClick(() => {
      this.onCardClick(this.card);
    })
  }
}

const cardList = Array.from({ length: 20 }, (_: undefined, index) => {
  return {
    id: util.generateRandomUUID(),
    image: $r(`app.media.img_${(index % 6)}`),
    content: $r('app.string.content')
  } as Card;
});

@Component
export struct LongTakeTransition {
  @State showDetailView: boolean = false;
  @State selectedCard: Card | null = null;

  onCardClick(card: Card) {
    this.selectedCard = card;
    this.getUIContext().animateTo({ duration: 600 }, () => {
      this.showDetailView = true;
    });
  }

  onDetailViewBack() {
    this.getUIContext().animateTo({ duration: 600 }, () => {
      this.showDetailView = false;
    });
  }

  build() {
    NavDestination() {
      Stack() {
        Column() {
          TitleBar({ title: $r('app.string.title_long_take_transition') })
          WaterFlow() {
            ForEach(cardList, (card: Card) => {
              FlowItem() {
                CardView({
                  card,
                  onCardClick: card => { this.onCardClick(card) }
                })
              }
              .width('100%')
              .borderRadius(10)
              .clip(true)
              .geometryTransition(card.id)
            }, (card: Card) => card.id)
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(10)
          .rowsGap(10)
        }
        .width('100%')
        .height('100%')
        .padding({
          left: 16,
          right: 16
        })
        if (this.showDetailView) {
          LongTakeDetail({
            card: this.selectedCard!,
            onBack: () => { this.onDetailViewBack(); }
          })
        }
      }
    }
    .hideTitleBar(true)
    .backgroundColor('#F1F3F5')
    .onBackPressed(() => {
      if (!this.showDetailView) {
        return false;
      }
      this.onDetailViewBack();
      return true;
    })
  }
}