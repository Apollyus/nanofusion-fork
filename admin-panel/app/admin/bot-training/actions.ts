'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// No static import for pdf-parse to avoid build errors

export async function getKnowledgeBase() {
  const supabase = await createAdminClient()
  const { data, error } = await (supabase.from('bot_knowledge') as any)
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Knowledge Base Fetch Error:', error.message)
    return []
  }
  return data || []
}

export async function uploadBotDocument(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) throw new Error('Nebyl vybrán žádný soubor')

  const supabase = await createAdminClient()

  // Ensure "bot-documents" storage bucket exists (Self-Healing Storage)
  try {
    const { data: bucket, error: bucketError } = await supabase.storage.getBucket('bot-documents')
    if (bucketError || !bucket) {
      console.log('NANOfusion: Bucket "bot-documents" not found. Creating it dynamically...')
      const { error: createError } = await supabase.storage.createBucket('bot-documents', {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760 // 10MB limit
      })
      if (createError) {
        console.error('NANOfusion: Failed to create bucket "bot-documents":', createError.message)
      } else {
        console.log('NANOfusion: Bucket "bot-documents" created successfully.')
      }
    }
  } catch (bucketEx) {
    console.warn('NANOfusion: Bucket existence check failed:', bucketEx)
  }
  
  // 1. Upload to Storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `bot-docs/${fileName}`

  try {
    const { error: uploadError } = await supabase.storage
      .from('bot-documents')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError)
      const msg = uploadError.message.toLowerCase()
      if (msg.includes('bucket not found') || msg.includes('not found')) {
        throw new Error('V Supabase Storage chybí bucket "bot-documents". Pokusili jsme se ho automaticky vytvořit, zkontrolujte prosím přístupová práva.')
      }
      throw new Error('Chyba nahrávání: ' + uploadError.message)
    }
  } catch (e: any) {
    throw new Error(e.message)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('bot-documents')
    .getPublicUrl(filePath)

  // 2. Parse PDF using PDFParse class from Mehmet Kozan's pdf-parse package
  const { PDFParse } = require('pdf-parse')
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const parser = new PDFParse({ data: buffer })
  await parser.load()
  const pdfData = await parser.getText()
  const extractedText = pdfData.text
  await parser.destroy()

  // 3. Save to bot_knowledge as a special entry
  const { error: kbError } = await (supabase.from('bot_knowledge') as any).insert([{
    title: `Dokument: ${file.name}`,
    content: extractedText,
    category: 'dokumenty',
    is_active: true
  }])

  if (kbError) throw new Error('Chyba při ukládání textu: ' + kbError.message)

  // 4. Log to bot_documents
  await (supabase.from('bot_documents') as any).insert([{
    name: file.name,
    file_url: publicUrl,
    file_path: filePath,
    content: extractedText
  }])

  revalidatePath('/admin/bot-training')
  return { success: true }
}

export async function saveKnowledge(data: {
  id?: string
  title: string
  content: string
  category?: string
  is_active?: boolean
}) {
  const supabase = await createAdminClient()
  if (data.id) {
    const { error } = await (supabase.from('bot_knowledge') as any)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', data.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await (supabase.from('bot_knowledge') as any).insert([data])
    if (error) throw new Error(error.message)
  }
  revalidatePath('/admin/bot-training')
}

export async function deleteKnowledge(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('bot_knowledge') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/bot-training')
}

export async function toggleKnowledgeActive(id: string, is_active: boolean) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('bot_knowledge') as any)
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/bot-training')
}
