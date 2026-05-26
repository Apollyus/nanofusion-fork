import { getKnowledgeBase } from './actions'
import { BotTrainingClient } from './bot-training-client'

export default async function BotTrainingPage() {
  const knowledge = await getKnowledgeBase()
  
  return (
    <BotTrainingClient initialKnowledge={knowledge} />
  )
}
