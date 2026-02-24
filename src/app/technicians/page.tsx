import seedData from '@/data/seed.json';

export default function TechniciansPage() {
  const { technicians } = seedData;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">👷 Technicians</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {technicians.map((tech) => (
          <div key={tech.id} className="bg-white rounded-lg shadow-sm border p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-semibold text-slate-900">{tech.name}</h2>
                <p className="text-xs text-slate-500 font-mono">{tech.id}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                tech.availability === 'available' ? 'bg-green-100 text-green-800' :
                tech.availability === 'on-job' ? 'bg-blue-100 text-blue-800' :
                tech.availability === 'off-duty' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {tech.availability}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-slate-500">Skill Level</p>
                <p className="font-medium capitalize">{tech.skillLevel}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Specialties</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tech.specialties.map((s) => (
                    <span key={s} className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">Certifications</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tech.certifications.map((c) => (
                    <span key={c} className="bg-amber-50 text-amber-800 text-xs px-2 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              {tech.currentLocation && (
                <div>
                  <p className="text-xs text-slate-500">Current Location</p>
                  <p className="text-slate-700">{tech.currentLocation}</p>
                </div>
              )}
              <div className="pt-2 border-t text-xs text-slate-500">
                {tech.email} · {tech.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
