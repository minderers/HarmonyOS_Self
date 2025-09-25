class Course {
  id: string
  name: string
  teacher: string
  time: string
  location: string
  day: number // 1-7 表示周一到周日
  startTime: string // 格式："08:00"
  endTime: string // 格式："09:40"

  constructor(id: string, name: string, teacher: string, location: string, day: number, startTime: string, endTime: string) {
    this.id = id
    this.name = name
    this.teacher = teacher
    this.location = location
    this.day = day
    this.startTime = startTime
    this.endTime = endTime
    this.time = `${startTime}-${endTime}`
  }
}

export default Course