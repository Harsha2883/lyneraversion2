
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { content, contextType, voiceEnabled } = await req.json()
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API key')
    }

    // Context mapping for different use cases
    const contextMap = {
      "course": "You are an expert sustainability education assistant. Provide clear, engaging, and informative responses about sustainability topics. Focus on giving practical examples and actionable insights.",
      "assessment": "You are an assessment assistant for sustainability education. Help evaluate knowledge and provide constructive feedback on sustainability topics.",
      "ebook": "You are a helpful reading companion for sustainability e-books. Explain concepts, summarize information, and answer questions about the content being read.",
      "general": "You are a helpful sustainability education assistant. Provide clear, informative responses about sustainability topics.",
    }

    const systemPrompt = contextMap[contextType] || contextMap.general

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`OpenAI API error: ${errorBody}`)
    }

    const data = await response.json()
    const textResponse = data.choices[0].message.content

    let audioResponse = null
    if (voiceEnabled) {
      // Generate audio response using OpenAI's TTS
      const audioResult = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: textResponse,
          voice: 'nova',
          response_format: 'mp3',
        }),
      })

      if (!audioResult.ok) {
        console.error('Error generating audio response')
      } else {
        // Convert audio to base64
        const arrayBuffer = await audioResult.arrayBuffer()
        audioResponse = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      }
    }

    return new Response(JSON.stringify({
      text: textResponse,
      audio: audioResponse,
      contextType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in AI assistant function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
