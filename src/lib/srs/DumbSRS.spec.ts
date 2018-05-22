import { DumbSRS } from 'src/lib/srs/DumbSRS'
import { Reviewable, GradeRecord } from 'src/lib/srs/main'

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
    const gradedItem: Reviewable = srs.grade(item, 1)
    expect(gradedItem).toMatchSnapshot()
  })

  it('Adds 1 day to the next review date if incorrect', () => {
    const gradedItem: Reviewable = srs.grade(item, 0)
    expect(gradedItem).toMatchSnapshot()
  })
})
