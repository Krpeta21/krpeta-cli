import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

function cleanStdout (stdout) {
  return stdout.trim().split('\n').filter(Boolean)
}

export async function getChangedFiles () {
  const { stdout } = await execAsync('git status --porcelain')
  return cleanStdout(stdout).map((line) => line.split(' ').at(-1))
}

export async function getStagedFiles () {
  const { stdout } = await execAsync('git diff --cached --name-only')
  return cleanStdout(stdout)
}

export async function gitCommit ({ commit } = {}) {
  const { stdout } = await execAsync(`git commit -m "${commit}"`)
  return cleanStdout(stdout)
}
export async function gitPush ({ branchName = 'main' }) {
  const { stdout } = await execAsync(`git push origin ${branchName}`)
  return stdout
}
export async function gitAdd ({ files = [] } = {}) {
  const filesLine = files.join(' ')
  const { stdout } = await execAsync(`git add ${filesLine}`)
  return cleanStdout(stdout)
}

export async function gitInit () {
  const { stdout } = await execAsync('git init')
  return stdout
}

export async function addRemote (urlRepo) {
  const { stdout } = await execAsync(`git remote add origin ${urlRepo}`)
  return stdout
}

export async function changeRemoteUrl (newUrl) {
  const { stdout } = await execAsync(`git remote set-url origin ${newUrl}`)
  return stdout
}