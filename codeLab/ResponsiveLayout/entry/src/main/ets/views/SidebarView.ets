import { WidthBreakpointType } from '../utils/WidthBreakpointType';
import { WindowInfo } from '../utils/WindowUtil';

@Component
export struct SidebarView {
  @ObjectLink mainWindowInfo: WindowInfo;
  @State isShowingSidebar: boolean = this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? false : true;
  pageInfos: NavPathStack = new NavPathStack();

  build() {
    // [Start side_bar_view]
    SideBarContainer(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? SideBarContainerType.Overlay :
      SideBarContainerType.Embed) {
      Column() {
        // [StartExclude side_bar_view]
        Scroll() {
          Column() {
            Image($r('app.media.open_sidebar'))
              .width(40)
              .height(40)
              .onClick(() => {
                this.isShowingSidebar = !this.isShowingSidebar;
              })
            Column() {
              Column() {
                Text('SidebarContainer')
                  .fontSize(18)
                  .margin({ bottom: 12 })
                Text($r('app.string.side_bar'))
                  .fontSize(24)
              }
              .width('100%')
            }
            .layoutWeight(1)
            .justifyContent(FlexAlign.Center)
            .width('100%')
          }
          .height('100%')
          .width('100%')
          .alignItems(HorizontalAlign.Start)
        }
        .height('100%')
        .width('100%')
        .padding({
          top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
          bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
          left: 16,
          right: 16
        })
        // [EndExclude side_bar_view]
      }
      .backgroundColor('#F1F3F5')

      Column() {
        // [StartExclude side_bar_view]
        Row() {
          Image($r('app.media.open_sidebar'))
            .width(40)
            .height(40)
            .margin({ right: 12 })
            .onClick(() => {
              this.isShowingSidebar = !this.isShowingSidebar;
            })
            .visibility(!this.isShowingSidebar ? Visibility.Visible : Visibility.None)
          Image($r('app.media.ic_public_back'))
            .width(40)
            .height(40)
            .margin({ right: 12 })
            .onClick(() => {
              this.pageInfos.pop();
            })
          Text($r('app.string.sidebar'))
            .fontSize(24)
        }
        .width('100%')
        .margin({ bottom: 12 })

        Scroll() {
          Text($r('app.string.main_page'))
            .fontSize(24)
        }
        .layoutWeight(1)
        .align(Alignment.Center)
        .width('100%')
        // [EndExclude side_bar_view]
      }
      .backgroundColor('#FDBFFC')
      .padding({
        top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
        bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
        left: 16,
        right: 16
      })
    }
    .showSideBar(this.isShowingSidebar)
    .sideBarWidth(new WidthBreakpointType('80%', '50%', '40%').getValue(this.mainWindowInfo.widthBp))
    .controlButton({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 })
    // [End side_bar_view]
    .showControlButton(false)
    .autoHide(false)
  }
}