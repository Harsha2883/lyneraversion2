
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
    const { courseId, userMessage } = await req.json()
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API key')
    }

    // Enhanced course-specific contexts with more detailed guidance
    const courseContexts = {
      'ai-1': 'You are an expert in Green Technology. Provide in-depth, innovative insights about sustainable technologies. Explain complex concepts clearly, use analogies, and offer practical applications.',
      'ai-2': 'You are a sustainability lifestyle coach. Provide actionable, personalized advice on sustainable living. Break down complex environmental concepts into easy-to-understand, practical steps.',
    }

    const systemPrompt = courseContexts[courseId] || 'You are a sustainability education expert. Provide clear, engaging, and informative responses.'

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
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`OpenAI API error: ${errorBody}`)
    }

    const data = await response.json()
    return new Response(JSON.stringify({
      message: data.choices[0].message.content,
      courseContext: courseContexts[courseId] || 'General Sustainability'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in AI course function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
