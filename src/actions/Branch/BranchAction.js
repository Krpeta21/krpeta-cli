import {
  isCancel,
  select
} from '@clack/prompts'
import colors from 'picocolors'
import { BRANCH_TYPES } from '../../types/branch-types.js'
import { exitProgram } from '../../utils.js'
import { CreateBranch } from './CreateBranch.js'
import { DeleteBranch } from './DeleteBranch.js'
import { ShowBranch } from './ShowBranch.js'
import { SwitchAction } from './SwitchAction.js'

export async function BranchAction () {
  const branchActions = await select(
    {
      message: colors.cyan('Select the action you want to do: '),
      options: Object.entries(BRANCH_TYPES).map(([key, value]) => (
        {
          value: key,
          label: `${value.emoji} ${key.padEnd(10, ' ')} · ${value.description}`
        }
      ))
    }
  )
  if (isCancel(branchActions)) exitProgram()
  if (branchActions === BRANCH_TYPES.create.action) {
    await CreateBranch()
  }
  if (branchActions === BRANCH_TYPES.show.action) {
    await ShowBranch()
  }
  if (branchActions === BRANCH_TYPES.delete.action) {
    await DeleteBranch()
  }
  if (branchActions === BRANCH_TYPES.switch.action) {
    await SwitchAction()
  }
}
