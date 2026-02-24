import seedData from '@/data/seed.json';

export default function DashboardPage() {
  const { serviceRequests, technicians } = seedData;
  
  const openRequests = serviceRequests.filter(r => r.status === 'open').length;
  const emergencyRequests = serviceRequests.filter(r => r.priority === 'emergency').length;
  const availableTechs = technicians.filter(t => t.availability === 'available').length;
  const onJobTechs = technicians.filter(t => t.availability === 'on-job').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">📊 Dashboard</h1>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <p className="text-sm text-slate-500">Open Requests</p>
          <p className="text-3xl font-bold text-slate-900">{openRequests}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <p className="text-sm text-slate-500">Emergencies</p>
          <p className="text-3xl font-bold text-red-600">{emergencyRequests}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <p className="text-sm text-slate-500">Technicians Available</p>
          <p className="text-3xl font-bold text-green-600">{availableTechs}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <p className="text-sm text-slate-500">Technicians On Job</p>
          <p className="text-3xl font-bold text-blue-600">{onJobTechs}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Requests</h2>
          <div className="space-y-3">
            {serviceRequests.slice(0, 5).map(req => (
              <div key={req.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{req.title}</p>
                  <p className="text-xs text-slate-500">{req.location}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  req.priority === 'emergency' ? 'bg-red-100 text-red-800' :
                  req.priority === 'urgent' ? 'bg-orange-100 text-orange-800' :
                  req.priority === 'routine' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {req.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Technician Status</h2>
          <div className="space-y-3">
            {technicians.map(tech => (
              <div key={tech.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{tech.name}</p>
                  <p className="text-xs text-slate-500">{tech.specialties.join(', ')}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  tech.availability === 'available' ? 'bg-green-100 text-green-800' :
                  tech.availability === 'on-job' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {tech.availability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
