import Database from 'better-sqlite3';

export function seedDatabase(db: Database.Database) {
  const insertRequest = db.prepare(`
    INSERT INTO service_requests (title, description, status, priority, category, location, requester_name, requester_email, assigned_technician_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTechnician = db.prepare(`
    INSERT INTO technicians (name, email, phone, specialties, certification_level, available, current_location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const requests = [
    ['Water leak in basement mechanical room', 'Water leak in basement mechanical room, spreading toward electrical panel. Maintenance reported puddle growing over last 2 hours. Need immediate assessment before it reaches the breaker box.', 'open', 'emergency', 'plumbing', 'Building A - Basement', 'Maria Santos', 'msantos@acme.example.com', null, '2025-01-15T08:30:00Z', '2025-01-15T08:30:00Z'],
    ['HVAC grinding noise - intermittent', 'HVAC unit on roof making grinding noise, but only during peak hours (11am-2pm). Tenants on 4th floor complaining about vibration. Unit is a Carrier 50XC 15-ton from 2019. Last serviced 6 months ago.', 'in_progress', 'urgent', 'hvac', 'Building B - Roof', 'James Chen', 'jchen@acme.example.com', 2, '2025-01-14T14:15:00Z', '2025-01-15T09:00:00Z'],
    ['Emergency exit lights out - 3rd floor', 'Emergency exit lights not working on 3rd floor, both east and west stairwells. This is a fire code violation. Last inspection was 3 months ago and all passed. Possible circuit issue.', 'open', 'emergency', 'safety', 'Building A - 3rd Floor', 'Patricia Williams', 'pwilliams@acme.example.com', null, '2025-01-15T07:45:00Z', '2025-01-15T07:45:00Z'],
    ['Additional power outlets in Conference Room B', 'Request to install 4 additional power outlets in Conference Room B for the new video conferencing setup. Need two floor outlets and two wall outlets. Room is used daily 8am-6pm so work needs to be scheduled after hours.', 'open', 'low', 'electrical', 'Building C - 2nd Floor', 'Robert Kim', 'rkim@acme.example.com', null, '2025-01-13T10:00:00Z', '2025-01-13T10:00:00Z'],
    ['Elevator stuck between floors', 'Elevator #2 stuck between floors 5 and 6. No passengers currently inside (confirmed by security). Display panel showing error code E-47. This is the second time this month.', 'in_progress', 'emergency', 'structural', 'Building A - Elevator Shaft', 'Tom Bradley', 'tbradley@acme.example.com', 1, '2025-01-15T06:20:00Z', '2025-01-15T06:45:00Z'],
    ['Parking lot lights flickering', 'Multiple parking lot light poles in Section C flickering intermittently. Affects approximately 8 poles. Security concerned about visibility at night. Started after last week\'s storm.', 'open', 'routine', 'electrical', 'Parking Lot C', 'Linda Foster', 'lfoster@acme.example.com', null, '2025-01-12T16:30:00Z', '2025-01-12T16:30:00Z'],
    ['Restroom plumbing backup - 1st floor', 'Men\'s restroom on 1st floor has a slow drain in all three sinks and one toilet is running constantly. Janitor says it\'s been getting worse over the past week.', 'open', 'urgent', 'plumbing', 'Building A - 1st Floor', 'Steve Martinez', 'smartinez@acme.example.com', null, '2025-01-14T11:00:00Z', '2025-01-14T11:00:00Z'],
    ['Server room temperature alarm', 'Server room temperature alarm triggered at 82°F. Normal range is 65-75°F. CRAC unit appears to be running but not cooling effectively. IT requesting immediate response to prevent equipment damage.', 'in_progress', 'emergency', 'hvac', 'Building B - Server Room 201', 'Angela Park', 'apark@acme.example.com', 3, '2025-01-15T05:00:00Z', '2025-01-15T05:15:00Z'],
  ];

  const technicians = [
    ['Mike Johnson', 'mjohnson@acme.example.com', '555-0101', '["electrical","safety"]', 'senior', 1, 'Building A'],
    ['Sarah Williams', 'swilliams@acme.example.com', '555-0102', '["hvac","electrical"]', 'specialist', 0, 'Building B - Roof'],
    ['David Lee', 'dlee@acme.example.com', '555-0103', '["hvac","plumbing"]', 'senior', 0, 'Building B - Server Room'],
    ['Jennifer Garcia', 'jgarcia@acme.example.com', '555-0104', '["plumbing","general"]', 'mid', 1, 'HQ'],
    ['Chris Taylor', 'ctaylor@acme.example.com', '555-0105', '["structural","safety","electrical"]', 'specialist', 1, 'Building C'],
    ['Amanda Brown', 'abrown@acme.example.com', '555-0106', '["general","plumbing"]', 'junior', 1, 'HQ'],
  ];

  const insertRequests = db.transaction(() => {
    for (const r of requests) {
      insertRequest.run(...r);
    }
  });

  const insertTechnicians = db.transaction(() => {
    for (const t of technicians) {
      insertTechnician.run(...t);
    }
  });

  insertRequests();
  insertTechnicians();
}
