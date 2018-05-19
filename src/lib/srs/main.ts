export interface GradeRecord {
  // Data of the grading itself
  reviewedDate: Date
  score: Score

  // Data after calculating review
  ease: number
  nextReviewDate: Date
}

export interface Reviewable {
  currentEase: number
  nextReviewDate: Date
  gradeHistory: GradeRecord[]
}

// Range should be between 0..1.0 as it's a percentage
export type Score = number

export interface SRSLibrary {
  grade(item: Reviewable, score: Score): Reviewable
}

export { DumbSRS as SRS } from 'src/lib/srs/DumbSRS'
