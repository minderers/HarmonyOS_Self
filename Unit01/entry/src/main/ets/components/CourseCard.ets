import Course from '../model/Course'

@Component
export struct CourseCard {
  @Prop course: Course

  build() {
    Column() {
      Text(this.course.name)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 4 })
      
      Row() {
        Text(this.course.teacher)
          .fontSize(14)
          .margin({ right: 8 })
        Text(this.course.time)
          .fontSize(14)
      }
      .margin({ bottom: 4 })
      
      Text(this.course.location)
        .fontSize(14)
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#f0f0f0')
    .borderRadius(8)
    .margin({ bottom: 8 })
  }
}