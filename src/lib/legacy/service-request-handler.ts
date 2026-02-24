/**
 * ⚠️ LEGACY CODE — SESSION 5 REFACTORING EXERCISE
 *
 * This file handles service request processing. It works but has
 * significant code quality issues that need refactoring.
 *
 * Known issues:
 * - Duplicated validation logic
 * - Inconsistent error handling
 * - Mixed async patterns
 * - Magic numbers and hardcoded strings
 * - No TypeScript types (uses 'any')
 * - God function that does too many things
 *
 * YOUR TASK: Use /RefactorCode to clean this up.
 */

// TODO: This whole file needs a rewrite but "it works" so nobody touches it

var VALID_CATEGORIES = ['electrical', 'plumbing', 'hvac', 'structural', 'safety', 'general'];

// process a new service request - handles validation, assignment, notification
export function processNewRequest(data: any, callback: any) {
  // validate the request
  if (!data) {
    callback(null, { error: 'No data provided', code: 400 });
    return;
  }

  if (!data.title || data.title.length < 3) {
    callback(null, { error: 'Title is required and must be at least 3 characters', code: 400 });
    return;
  }

  if (!data.description || data.description.length < 10) {
    callback(null, { error: 'Description is required and must be at least 10 characters', code: 400 });
    return;
  }

  if (!data.location || data.location.length < 2) {
    callback(null, { error: 'Location is required', code: 400 });
    return;
  }

  if (data.category && VALID_CATEGORIES.indexOf(data.category) === -1) {
    callback(null, { error: 'Invalid category. Must be one of: ' + VALID_CATEGORIES.join(', '), code: 400 });
    return;
  }

  if (data.priority && ['emergency', 'urgent', 'routine', 'low'].indexOf(data.priority) === -1) {
    callback(null, { error: 'Invalid priority', code: 400 });
    return;
  }

  // generate ID - terrible approach but it works
  var id = 'SR-' + Math.floor(Math.random() * 900000 + 100000);

  var request = {
    id: id,
    title: data.title,
    description: data.description,
    category: data.category || 'general',
    priority: data.priority || 'routine',
    status: 'open',
    location: data.location,
    reportedBy: data.reportedBy || 'Anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // try to auto-assign based on priority
  if (request.priority === 'emergency') {
    // find any available technician - hardcoded logic
    var techs = getAvailableTechnicians();
    if (techs.length > 0) {
      request.status = 'assigned';
      (request as any).assignedTo = techs[0].id;
      // send emergency notification
      sendNotification(techs[0].email, 'EMERGENCY: ' + request.title, 'Urgent service request requires immediate attention at ' + request.location);
    }
  }

  callback(request, null);
}


// update an existing service request
export async function updateRequest(id: any, updates: any) {
  // validate id
  if (!id || typeof id !== 'string') {
    return Promise.reject('Invalid request ID');
  }

  // validate the updates - DUPLICATE validation from above
  if (updates.title !== undefined && updates.title !== null) {
    if (updates.title.length < 3) {
      throw new Error('Title must be at least 3 characters');
    }
  }

  if (updates.description !== undefined && updates.description !== null) {
    if (updates.description.length < 10) {
      throw new Error('Description must be at least 10 characters');
    }
  }

  if (updates.location !== undefined && updates.location !== null) {
    if (updates.location.length < 2) {
      throw new Error('Location is required');
    }
  }

  if (updates.category) {
    if (VALID_CATEGORIES.indexOf(updates.category) === -1) {
      throw new Error('Invalid category');
    }
  }

  if (updates.priority) {
    if (['emergency', 'urgent', 'routine', 'low'].indexOf(updates.priority) === -1) {
      throw new Error('Invalid priority');
    }
  }

  if (updates.status) {
    if (['open', 'assigned', 'in-progress', 'completed', 'cancelled'].indexOf(updates.status) === -1) {
      throw new Error('Invalid status');
    }
  }

  updates.updatedAt = new Date().toISOString();

  // handle status transitions
  if (updates.status === 'completed') {
    // calculate completion time - magic number alert
    updates.completionTime = Date.now();
    // 86400000 = milliseconds in a day, we track if it was resolved same day
    updates.sameDayResolution = (Date.now() - new Date(updates.createdAt || 0).getTime()) < 86400000;
  }

  if (updates.status === 'assigned' && updates.assignedTo) {
    // notify the assigned technician
    var techEmail = getTechnicianEmail(updates.assignedTo);
    if (techEmail) {
      sendNotification(techEmail, 'New Assignment: ' + id, 'You have been assigned to service request ' + id);
    }
  }

  return updates;
}


// search service requests - WARNING: has SQL injection vulnerability (Session 10 exercise)
export function searchRequests(query: any, filters: any) {
  var results: any[] = [];
  var sql = "SELECT * FROM service_requests WHERE 1=1";

  // ⚠️ DELIBERATE VULNERABILITY — Session 10 Security Exercise
  // This concatenates user input directly into SQL
  if (query) {
    sql += " AND (title LIKE '%" + query + "%' OR description LIKE '%" + query + "%')";
  }

  if (filters) {
    if (filters.category) {
      sql += " AND category = '" + filters.category + "'";
    }
    if (filters.priority) {
      sql += " AND priority = '" + filters.priority + "'";
    }
    if (filters.status) {
      sql += " AND status = '" + filters.status + "'";
    }
  }

  // In a real app, this would execute the SQL
  // For training, we just return the constructed query for demonstration
  console.log('Executing query:', sql);

  return { query: sql, results: results };
}


// get request statistics - callback hell
export function getRequestStats(timeRange: any, callback: any) {
  var stats: any = {};

  // count by priority
  countByField('priority', timeRange, function(err: any, priorityCounts: any) {
    if (err) {
      callback(null, err);
      return;
    }
    stats.byPriority = priorityCounts;

    // count by category
    countByField('category', timeRange, function(err: any, categoryCounts: any) {
      if (err) {
        callback(null, err);
        return;
      }
      stats.byCategory = categoryCounts;

      // count by status
      countByField('status', timeRange, function(err: any, statusCounts: any) {
        if (err) {
          callback(null, err);
          return;
        }
        stats.byStatus = statusCounts;

        // calculate average resolution time
        calculateAvgResolutionTime(timeRange, function(err: any, avgTime: any) {
          if (err) {
            callback(null, err);
            return;
          }
          stats.avgResolutionTime = avgTime;

          // total count
          getTotalCount(timeRange, function(err: any, total: any) {
            if (err) {
              callback(null, err);
              return;
            }
            stats.total = total;

            // SLA compliance - hardcoded SLA times in milliseconds
            // emergency: 1 hour = 3600000, urgent: 4 hours = 14400000
            // routine: 24 hours = 86400000, low: 72 hours = 259200000
            stats.slaCompliance = {
              emergency: stats.byPriority.emergency_resolved_in_time || 0,
              urgent: stats.byPriority.urgent_resolved_in_time || 0,
              routine: stats.byPriority.routine_resolved_in_time || 0,
              low: stats.byPriority.low_resolved_in_time || 0,
            };

            callback(stats, null);
          });
        });
      });
    });
  });
}


// Helper functions (stubs for training)
function getAvailableTechnicians(): any[] {
  // In production, this queries the database
  return [];
}

function getTechnicianEmail(techId: string): string | null {
  // In production, this looks up the technician
  return null;
}

function sendNotification(email: string, subject: string, body: string) {
  // In production, this sends an email
  console.log(`[NOTIFICATION] To: ${email}, Subject: ${subject}`);
}

function countByField(field: string, timeRange: any, callback: any) {
  // Stub
  callback(null, {});
}

function calculateAvgResolutionTime(timeRange: any, callback: any) {
  // Stub
  callback(null, 0);
}

function getTotalCount(timeRange: any, callback: any) {
  // Stub
  callback(null, 0);
}


// ⚠️ DELIBERATE VULNERABILITY — Session 10 Security Exercise
// Hardcoded API key in source code
export const INTERNAL_API_KEY = 'sk-acme-prod-2026-xK9mP2nQ4rT6';

// Admin endpoint with no authentication check
export function getAdminDashboardData() {
  return {
    totalRequests: 1247,
    activeRequests: 89,
    avgResponseTime: '2.4 hours',
    technicianCount: 23,
    monthlyBudget: 45000,
    // ⚠️ Exposes sensitive data without auth
    apiKeys: [INTERNAL_API_KEY],
    databaseUrl: 'postgresql://admin:supersecret@db.internal:5432/acme',
  };
}
