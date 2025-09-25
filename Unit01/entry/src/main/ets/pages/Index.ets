import { CourseCard } from '../components/CourseCard'
import Course from '../model/Course'

@Entry
@Component
struct Index {
  @State selectedDay: number = 1
  @State courses: Course[] = [
    new Course('1', '高等数学', '张教授', 'A101', 1, '08:00', '09:40'),
    new Course('2', '大学物理', '李教授', 'B203', 1, '10:00', '11:40'),
    new Course('3', '程序设计', '王教授', 'C305', 2, '14:00', '15:40'),
    new Course('4', '英语', '刘教授', 'D401', 3, '08:00', '09:40'),
    new Course('5', '数据结构', '陈教授', 'E501', 4, '10:00', '11:40'),
    new Course('6', '操作系统', '赵教授', 'F601', 5, '14:00', '15:40'),
    // 添加周日课程
    new Course('7', '体育', '孙教授', 'G701', 7, '09:00', '10:40'),
  ]

  // 获取当前选中日期的课程数量
  getSelectedDayCourseCount(): number {
    return this.courses.filter(course => course.day === this.selectedDay).length
  }
  
  // 修正今日课程数量计算
  getTodayCourseCount(): number {
    let today = new Date().getDay() // 0-6
    // 转换为1-7格式：周日(0)转为7，其他+1
    today = today === 0 ? 7 : today
    return this.courses.filter(course => course.day === today).length
  }

  // 获取收藏课程数量（这里假设所有课程都可能被收藏）
  getFavoriteCourseCount(): number {
    return 0 // 暂时返回0，可以后续添加收藏功能
  }

  // 获取总学习时间（分钟）
  getSelectedDayTotalMinutes(): number {
    const selectedCourses = this.courses.filter(course => course.day === this.selectedDay)
    let totalMinutes = 0
    
    selectedCourses.forEach(course => {
      // 计算每门课的时长
      const startTime = course.startTime.split(':')
      const endTime = course.endTime.split(':')
      const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1])
      const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1])
      totalMinutes += (endMinutes - startMinutes)
    })
    
    return totalMinutes
  }

  // 获取星期名称
  getDayName(day: number): string {
    const dayNames = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
    return dayNames[day]
  }

  @Builder TabBuilder(day: number, text: string) {
    Column() {
      Text(text)
        .fontColor(this.selectedDay === day ? '#FFFFFF' : '#666666')
        .fontSize(14)
        .fontWeight(this.selectedDay === day ? FontWeight.Bold : FontWeight.Regular)
    }
    .width(50)
    .height(40)
    .backgroundColor(this.selectedDay === day ? '#007AFF' : 'transparent')
    .borderRadius(20)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.selectedDay = day
    })
  }

  @Builder StatCard(title: string, count: number, color: string) {
    Column() {
      Text(count.toString())
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor(color)
      Text(title)
        .fontSize(12)
        .fontColor('#999999')
        .margin({ top: 4 })
    }
    .justifyContent(FlexAlign.Center)
  }

  @Builder EmptyState() {
    Column() {
      Text('📚')
        .fontSize(60)
        .margin({ bottom: 16 })
      Text(`${this.getDayName(this.selectedDay)}没有课程安排`)
        .fontSize(16)
        .fontColor('#666666')
        .margin({ bottom: 8 })
      Text('享受轻松的一天吧！')
        .fontSize(14)
        .fontColor('#999999')
    }
    .justifyContent(FlexAlign.Center)
    .height('60%')
  }

  @Builder CourseCard(course: Course) {
    Column() {
      Row() {
        Column() {
          Text(course.name)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 4 })
          Text(`${course.teacher} · ${course.location}`)
            .fontSize(14)
            .fontColor('#666666')
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        
        Text(course.time)
          .fontSize(14)
          .fontColor('#007AFF')
      }
      .width('100%')
      .alignItems(VerticalAlign.Top)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 12 })
    .shadow({
      radius: 4,
      color: '#1A000000',
      offsetX: 0,
      offsetY: 2
    })
  }

  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Text('我的课程表')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
        
        Blank()
        
        Text(this.getDayName(this.selectedDay))
          .fontSize(16)
          .fontColor('#FFFFFF')
      }
      .width('100%')
      .height(60)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#007AFF')
      .alignItems(VerticalAlign.Center)

      Column() {
        // 星期选择栏
        Row() {
          this.TabBuilder(1, '周一')
          this.TabBuilder(2, '周二')
          this.TabBuilder(3, '周三')
          this.TabBuilder(4, '周四')
          this.TabBuilder(5, '周五')
          this.TabBuilder(6, '周六')
          this.TabBuilder(7, '周日')
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)
        .margin({ top: 20, bottom: 20 })

        // 在build方法中的统计信息部分，修改为：
        // 统计信息
        Row() {
          Column() {
            Text(this.getSelectedDayCourseCount().toString())
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#007AFF')
            Text('今日课程')
              .fontSize(12)
              .fontColor('#999999')
              .margin({ top: 4 })
          }
          .justifyContent(FlexAlign.Center)
          
          Column() {
            Text(this.getFavoriteCourseCount().toString())
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FF3B30')
            Text('收藏课程')
              .fontSize(12)
              .fontColor('#999999')
              .margin({ top: 4 })
          }
          .justifyContent(FlexAlign.Center)
          
          Column() {
            Text(this.getSelectedDayTotalMinutes().toString())
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#34C759')
            Text('总分钟')
              .fontSize(12)
              .fontColor('#999999')
              .margin({ top: 4 })
          }
          .justifyContent(FlexAlign.Center)
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)
        .margin({ bottom: 30 })

        // 课程列表或空状态
        if (this.courses.filter(course => course.day === this.selectedDay).length === 0) {
          this.EmptyState()
        } else {
          List() {
            ForEach(this.courses.filter(course => course.day === this.selectedDay), (course: Course) => {
              ListItem() {
                this.CourseCard(course)
              }
            })
          }
          .width('100%')
          .layoutWeight(1)
        }
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#F5F5F5')
    }
    .width('100%')
    .height('100%')
  }
}