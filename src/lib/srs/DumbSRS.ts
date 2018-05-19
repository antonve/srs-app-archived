import { SRSLibrary, Reviewable, Score } from 'src/lib/srs/main'

export class DumbSRS implements SRSLibrary {
  private calculateNextReviewDate(item: Reviewable, score: Score): Date {
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + 6 * score + 1)

    return nextDate
  }

  grade(item: Reviewable, score: Score): Reviewable {
    const nextReviewDate = this.calculateNextReviewDate(item, score)
    const reviewedDate = new Date()

    return {
      ...item,
      nextReviewDate,
      gradeHistory: [...item.gradeHistory, { ease: item.currentEase, nextReviewDate, score, reviewedDate }],
    }
  }
}
