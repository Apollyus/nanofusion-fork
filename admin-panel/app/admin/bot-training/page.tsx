import { getKnowledgeBase, getBotEnabledStatus } from './actions'
import { BotTrainingClient } from './bot-training-client'

export default async function BotTrainingPage() {
  const knowledge = await getKnowledgeBase()
  const isBotEnabled = await getBotEnabledStatus()
  
  return (
    <BotTrainingClient initialKnowledge={knowledge} initialBotEnabled={isBotEnabled} />
  )
}
