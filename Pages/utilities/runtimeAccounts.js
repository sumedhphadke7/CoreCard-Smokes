import { updateRuntimeKey, getRuntimeData } from './runtimeDataManager';

export function createAccount(accountNumber) {

  const runtime = getRuntimeData()

  if (!runtime.Accounts) {
    updateRuntimeKey('Accounts', {})
  }

  updateRuntimeKey(`Accounts.${accountNumber}`, {
    cards: []
  })
}