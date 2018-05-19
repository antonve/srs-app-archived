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
    MockDate.set(1526713164815)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Adds seven days to the next review date if correct', () => {
    const gradedItem: Reviewable = srs.grade(item, 1)
    expect(gradedItem.currentEase).toBe(item.currentEase)
    expect(gradedItem.nextReviewDate.toDateString()).toBe('Sat May 26 2018')
    expect(gradedItem.gradeHistory.length).toBe(1)
  })

  it('Adds 1 day to the next review date if incorrect', () => {})
})
