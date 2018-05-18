export interface GradeRecord {
  // Data of the grading itself
  timestamp: Date
  score: Score

  // Data after calculating review
  ease: number
}

export interface Reviewable {
  currentEase: number
  nextReviewData: Date
  gradeHistory: GradeRecord[]
}

// Range should be between 0..1.0 as it's a percentage
type Score = number

export interface SRS {
  grade(item: Reviewable, score: Score): void
}

export class DumbSRS implements SRS {
  grade(item: Reviewable, score: Score) {
    console.log('test')
  }
}
