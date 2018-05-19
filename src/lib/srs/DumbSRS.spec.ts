import { DumbSRS } from 'src/lib/srs/DumbSRS'
import { Reviewable, Score, GradeRecord } from 'src/lib/srs/main'

import * as MockDate from 'mockdate'

describe('DumbSRS', () => {
  const srs = new DumbSRS()
  const item: Reviewable = {
    currentEase: 2.8,
    nextReviewDate: new Date(),
    gradeHistory: [] as GradeRecord[],
  }

  beforeAll(() => {
    // May 19 2018
    MockDate.set(1526713164815)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Adds seven days to the next review date if correct', () => {
    const score: Score = 1
    const gradedItem: Reviewable = srs.grade(item, score)
    const currentDate = new Date()

    expect(gradedItem.currentEase).toBe(item.currentEase)
    expect(gradedItem.nextReviewDate.toDateString()).toBe('Sat May 26 2018')

    expect(gradedItem.gradeHistory.length).toBe(1)
    expect(gradedItem.gradeHistory[0].score).toBe(score)
    expect(gradedItem.gradeHistory[0].reviewedDate).toEqual(currentDate)
    expect(gradedItem.gradeHistory[0].ease).toBe(item.currentEase)
    expect(gradedItem.gradeHistory[0].nextReviewDate.toDateString()).toBe('Sat May 26 2018')
  })

  it('Adds 1 day to the next review date if incorrect', () => {
    const gradedItem: Reviewable = srs.grade(item, 0)
    const currentDate = new Date()

    expect(gradedItem.nextReviewDate.toDateString()).toBe('Sun May 20 2018')
  })
})
