import Link from 'next/link';
import { notFound } from 'next/navigation';
import seedData from '@/data/seed.json';
import { getCategoryIcon, getPriorityColor, getStatusColor, formatDate } from '@/lib/utils';

export default async function ServiceRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = seedData.serviceRequests.find(r => r.id === id);

  if (!request) {
    notFound();
  }

  const assignedTech = request.assignedTo
    ? seedData.technicians.find(t => t.id === request.assignedTo)
    : null;

  return (
    <div>
      <Link href="/service-requests" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Service Requests
      </Link>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-500 font-mono">{request.id}</p>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">{request.title}</h1>
          </div>
          <div className="flex gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(request.priority)}`}>
              {request.priority}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mt-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-sm font-medium text-slate-500 mb-1">Description</h2>
              {/* ⚠️ DELIBERATE XSS VULNERABILITY — Session 10 Security Exercise */}
              <div
                className="text-slate-700"
                dangerouslySetInnerHTML={{ __html: request.description }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-500">Category</p>
                <p className="text-sm font-medium">{getCategoryIcon(request.category)} {request.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm font-medium">{request.location}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Reported By</p>
                <p className="text-sm font-medium">{request.reportedBy}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Created</p>
                <p className="text-sm font-medium">{formatDate(request.createdAt)}</p>
              </div>
              {assignedTech && (
                <div>
                  <p className="text-xs text-slate-500">Assigned Technician</p>
                  <p className="text-sm font-medium">{assignedTech.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
