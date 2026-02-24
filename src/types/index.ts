export interface ServiceRequest {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'emergency' | 'urgent' | 'routine' | 'low';
  category: 'electrical' | 'plumbing' | 'hvac' | 'structural' | 'safety' | 'general';
  location: string;
  requester_name: string;
  requester_email: string;
  assigned_technician_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface Technician {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialties: string[] | string;
  certification_level: 'junior' | 'mid' | 'senior' | 'specialist';
  available: boolean | number;
  current_location: string;
}

export interface TriageResult {
  category: string;
  priority: string;
  skillLevel: string;
  suggestedResponse: string;
  reasoning: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
