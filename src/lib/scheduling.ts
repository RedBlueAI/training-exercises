/**
 * Technician Scheduling Module
 *
 * ⚠️ SESSION 5 BRAINSTORM EXERCISE
 *
 * This module handles technician availability checking and scheduling.
 * It works correctly in most cases but has an intermittent bug that
 * causes ~10% failure rate in production.
 *
 * YOUR TASK: Use Brainstorm mode with Claude to identify and fix the bug.
 *
 * Hint: The bug is related to timezone handling. Think about what happens
 * when checking availability across midnight boundaries.
 */

interface TimeSlot {
  start: Date;
  end: Date;
}

interface TechSchedule {
  techId: string;
  timezone: string;
  workingHours: { start: number; end: number }; // hours in local time (e.g., 8, 17)
  bookedSlots: TimeSlot[];
}

/**
 * Check if a technician is available for a given time window.
 *
 * BUG: This function has a subtle timezone race condition.
 * It correctly converts times for most cases, but fails when:
 * - The requested time spans midnight in the technician's local timezone
 * - The server timezone differs from the technician's timezone
 * - DST transitions occur during the requested window
 *
 * The bug manifests as technicians being incorrectly marked as "available"
 * when they are actually off-duty, or "unavailable" when they are free.
 */
export function isTechnicianAvailable(
  schedule: TechSchedule,
  requestedStart: Date,
  requestedEnd: Date
): boolean {
  // Convert requested times to technician's local timezone
  const localStart = convertToTimezone(requestedStart, schedule.timezone);
  const localEnd = convertToTimezone(requestedEnd, schedule.timezone);

  // Check if the requested time falls within working hours
  const startHour = localStart.getHours();
  const endHour = localEnd.getHours();

  // 🐛 BUG: This comparison fails when the time window crosses midnight
  // For example, if working hours are 8-17 and request is 23:00-01:00,
  // startHour=23 and endHour=1. The check below incorrectly passes
  // because it doesn't handle the midnight wraparound.
  if (startHour < schedule.workingHours.start || endHour > schedule.workingHours.end) {
    // 🐛 BUG: When endHour < startHour (crosses midnight), this condition
    // evaluates incorrectly. endHour=1 is NOT > 17, so it passes!
    if (endHour < startHour) {
      // Developer thought this handles midnight crossing, but it actually
      // allows scheduling outside working hours
      return true; // 🐛 Should return false — technician is off duty!
    }
    return false;
  }

  // Check against booked slots
  for (const slot of schedule.bookedSlots) {
    if (hasOverlap(requestedStart, requestedEnd, slot.start, slot.end)) {
      return false;
    }
  }

  return true;
}

/**
 * Find the next available time slot for a technician.
 */
export function findNextAvailableSlot(
  schedule: TechSchedule,
  duration: number, // minutes
  afterTime: Date
): TimeSlot | null {
  const maxDaysToCheck = 14;
  let currentDate = new Date(afterTime);

  for (let day = 0; day < maxDaysToCheck; day++) {
    const localDate = convertToTimezone(currentDate, schedule.timezone);
    const dayStart = new Date(localDate);
    dayStart.setHours(schedule.workingHours.start, 0, 0, 0);

    const dayEnd = new Date(localDate);
    dayEnd.setHours(schedule.workingHours.end, 0, 0, 0);

    // Check each 30-minute slot in the working day
    let slotStart = new Date(Math.max(dayStart.getTime(), currentDate.getTime()));
    // Round up to next 30-minute boundary
    const minutes = slotStart.getMinutes();
    if (minutes > 0 && minutes <= 30) {
      slotStart.setMinutes(30, 0, 0);
    } else if (minutes > 30) {
      slotStart.setHours(slotStart.getHours() + 1, 0, 0, 0);
    }

    while (slotStart.getTime() + duration * 60000 <= dayEnd.getTime()) {
      const slotEnd = new Date(slotStart.getTime() + duration * 60000);

      if (isTechnicianAvailable(schedule, slotStart, slotEnd)) {
        return { start: slotStart, end: slotEnd };
      }

      // Move to next 30-minute slot
      slotStart = new Date(slotStart.getTime() + 30 * 60000);
    }

    // Move to next day
    currentDate = new Date(localDate);
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
  }

  return null;
}

/**
 * Convert a Date to a different timezone.
 *
 * Note: This is a simplified conversion for training purposes.
 * Production code should use a proper library like date-fns-tz or luxon.
 */
function convertToTimezone(date: Date, timezone: string): Date {
  const dateStr = date.toLocaleString('en-US', { timeZone: timezone });
  return new Date(dateStr);
}

/**
 * Check if two time windows overlap.
 */
function hasOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && end1 > start2;
}

/**
 * Schedule a technician for a service request.
 * Returns the scheduled time slot or null if no availability found.
 */
export function scheduleTechnician(
  schedule: TechSchedule,
  estimatedDuration: number, // minutes
  preferredTime?: Date
): TimeSlot | null {
  const startAfter = preferredTime || new Date();
  return findNextAvailableSlot(schedule, estimatedDuration, startAfter);
}
