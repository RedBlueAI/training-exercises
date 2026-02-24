'use client';

import { useState } from 'react';
import { TriageResult } from '@/types';
import { getCategoryIcon, getPriorityColor } from '@/lib/utils';

export default function AITriagePage() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<TriageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTriage = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Triage failed');
        return;
      }

      setResult(data.data);
    } catch {
      setError('Failed to connect to AI service. Make sure GROQ_API_KEY is set in .env.local');
    } finally {
      setLoading(false);
    }
  };

  const exampleRequests = [
    "Water is flooding the server room from a burst pipe above. Electrical equipment at risk.",
    "The thermostat in conference room 3B seems miscalibrated. Room temperature reads 68°F but feels much warmer.",
    "Need to install a new badge reader at the loading dock entrance. Not urgent — planning for next month.",
    "Smoke detector in stairwell B keeps triggering false alarms at 3 AM. Building security has to respond each time.",
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">🤖 AI Service Request Triage</h1>
      <p className="text-slate-600 mb-6">
        Powered by Groq (llama-3.1-8b-instant). Enter a service request description and AI will
        automatically categorize, prioritize, and suggest a response.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Service Request Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the service request..."
            />
            <button
              onClick={handleTriage}
              disabled={loading || !description.trim()}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '🔄 Analyzing...' : '🤖 Triage with AI'}
            </button>

            {error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="mt-4 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Try these examples:</h3>
            <div className="space-y-2">
              {exampleRequests.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setDescription(example)}
                  className="w-full text-left text-sm text-slate-600 p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                >
                  &quot;{example}&quot;
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {result ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Triage Result</h2>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Category</p>
                  <p className="font-medium">
                    {getCategoryIcon(result.category)} {result.category}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Priority</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(result.priority)}`}>
                    {result.priority}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Skill Level</p>
                  <p className="font-medium capitalize">{result.skillLevel}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">AI Reasoning</p>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{result.reasoning}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">Suggested Customer Response</p>
                <div className="text-sm text-slate-700 bg-blue-50 border border-blue-100 rounded-lg p-3 italic">
                  {result.suggestedResponse}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 rounded-lg p-8 text-center text-slate-500">
              <span className="text-4xl block mb-3">🤖</span>
              <p>Enter a service request description and click &quot;Triage with AI&quot; to see the result.</p>
              <p className="text-xs mt-2">Requires GROQ_API_KEY in .env.local</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
