import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  ministryId: '',

  healthScore: 0,

  // the user will need to define the stages of growth and their requirements based on minitry type, but we can provide some common ones as a starting point
  stages: [
    {
      id: crypto.randomUUID(),
      name: '',
      decription: '',
      stageGoals: [],
      framework: [],
      // allows user defines promotion rules
      requirements: [
        {
          id: crypto.randomUUID(),
          metric: '', // activeMember coming from /const/metric.constant.ts
          operator: '', // < | > | >= | <= ....
          value: 0
        }
      ]
    }
  ],

  // list of achievements based on the current stage (which the ministry gets overtime)
  achievements: [
    {
      id: '',
      title: '',
      badgeType: '',
      earnedAt: '',
      stageId: '',
      reward: '' // promote stage of development || unlock some achievement
    }
  ],

  currentStage: 'formation', // formation | operational | established | multiplying
  previousStage: 'none',

  history: [
    {
      action: 'stage-change',
      from: 'formation',
      to: 'operational',
      note: 'Reached minimum requirements',
      timestamp: nowTimestamp()
    }
  ],

  createdAt: nowTimestamp(),
  updateAt: ''
} as const
