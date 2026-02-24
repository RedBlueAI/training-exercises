import Link from 'next/link';
import seedData from '@/data/seed.json';
import { getCategoryIcon, getPriorityColor, getStatusColor } from '@/lib/utils';

export default function ServiceRequestsPage() {
  const { serviceRequests } = seedData;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">🔧 Service Requests</h1>
        <span className="text-sm text-slate-500">{serviceRequests.length} total</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Request</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {serviceRequests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/service-requests/${req.id}`} className="text-blue-600 hover:underline text-sm font-mono">
                    {req.id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/service-requests/${req.id}`} className="text-sm font-medium text-slate-900 hover:text-blue-600">
                    {req.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-slate-900">
                  {getCategoryIcon(req.category)} {req.category}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-900">{req.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
