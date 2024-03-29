import { addRemote, gitInit } from '../git.js'
import { text, outro, confirm, isCancel } from '@clack/prompts'
import colors from 'picocolors'
import { exitProgram } from '../utils.js'

export async function InitAction () {
  const confirmGitInit = await confirm({
    initialValue: true,
    message: `${colors.cyan('Do you want to start the repository in this folder?')}`
  })

  if (isCancel(confirmGitInit)) exitProgram()

  if (!confirmGitInit) {
    outro(colors.yellow('The repository did not start.'))
    process.exit(0)
  }

  await gitInit()

  const confirmAddRemote = await confirm({
    initialValue: true,
    message: `${colors.cyan('Do you want to add the URL of your repository?')}`
  }
  )
  if (isCancel(confirmAddRemote)) exitProgram()
  if (!confirmAddRemote) {
    outro(colors.yellow('No repository url added.'))
    process.exit(0)
  }
  const urlRepo = await text({
    message: colors.cyan('Enter the repository URL: '),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('The URL cannot be empty.')
      }
    }
  })
  if (isCancel(urlRepo)) exitProgram()
  await addRemote(urlRepo)
  outro(
    colors.green('Git started successfully.')
  )
}
