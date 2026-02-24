export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    emergency: 'bg-red-100 text-red-800',
    urgent: 'bg-orange-100 text-orange-800',
    routine: 'bg-blue-100 text-blue-800',
    low: 'bg-gray-100 text-gray-800',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    open: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    electrical: '⚡',
    plumbing: '🔧',
    hvac: '❄️',
    structural: '🏗️',
    safety: '🛡️',
    general: '📋',
  };
  return icons[category] || '📋';
}
