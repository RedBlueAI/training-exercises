'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Exercises', icon: '📚' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/service-requests', label: 'Service Requests', icon: '🔧' },
  { href: '/technicians', label: 'Technicians', icon: '👷' },
  { href: '/ai-triage', label: 'AI Triage', icon: '🤖' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <span className="font-bold text-lg">Field Service</span>
            <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full font-medium ml-2">
              TRAINING
            </span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
