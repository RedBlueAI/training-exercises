/**
 * Groq AI Client for Service Request Triage
 *
 * This module integrates with Groq's free-tier API using llama-3.1-8b-instant
 * to automatically categorize and prioritize service requests.
 *
 * ⭐ SESSION 5 EXERCISE: Students will implement the triageServiceRequest function
 * using the /ImplementFeature workflow command.
 *
 * Setup:
 * 1. Sign up at https://console.groq.com (free, no credit card)
 * 2. Create an API key
 * 3. Add to .env.local: GROQ_API_KEY=gsk_...
 */

import Groq from 'groq-sdk';
import { TriageResult } from '@/types';

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GROQ_API_KEY not set. Get your free key at https://console.groq.com'
      );
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

/**
 * Triage a service request using AI
 *
 * Takes a service request description and returns:
 * - category: electrical, plumbing, hvac, structural, safety, general
 * - priority: emergency, urgent, routine, low
 * - skillLevel: junior, mid, senior, specialist
 * - suggestedResponse: Customer-friendly acknowledgment
 * - reasoning: Why the AI made this categorization
 *
 * Uses Groq's llama-3.1-8b-instant (free tier: 30 RPM, 14,400 RPD)
 */
export async function triageServiceRequest(
  description: string
): Promise<TriageResult> {
  const groq = getGroqClient();

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a field service triage assistant for a facilities management company. Analyze incoming service requests and classify them.

Return a JSON object with these fields:
- "category": one of "electrical", "plumbing", "hvac", "structural", "safety", "general"
- "priority": one of "emergency" (immediate danger/code violation), "urgent" (affects operations, needs same-day), "routine" (scheduled maintenance ok), "low" (can be planned)
- "skillLevel": one of "junior" (basic tasks), "mid" (standard repairs), "senior" (complex diagnostics), "specialist" (licensed/certified required)
- "suggestedResponse": A professional, empathetic customer acknowledgment message (2-3 sentences)
- "reasoning": Brief explanation of why you chose this categorization (1-2 sentences)

Consider safety implications, code compliance, business impact, and technical complexity.`,
      },
      {
        role: 'user',
        content: `Triage this service request:\n\n${description}`,
      },
    ],
    model: 'llama-3.1-8b-instant',
    temperature: 0.3,
    max_tokens: 500,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from AI model');
  }

  return JSON.parse(content) as TriageResult;
}
