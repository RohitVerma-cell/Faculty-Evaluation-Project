
/**
 * Calculates patent marks based on status and type.
 * @param {string} status  - 'filed' | 'published' | 'granted'
 * @param {string} type    - 'national' | 'international'
 * @returns {number} marks
 */
export function calculatePatentMarks(status, type) {
  const marks = {
    filed_national: 5,
    filed_international: 8,
    published_national: 10,
    published_international: 15,
    granted_national: 20,
    granted_international: 30,
  };
  return marks[`${status}_${type}`] || 0;
}

/**
 * Adds a new entry to a list (state setter helper).
 */
export function addEntry(setter, entries, template) {
  setter([...entries, { ...template, id: String(Date.now()) }]);
}

/**
 * Removes an entry from a list (keeps at least 1).
 */
export function removeEntry(setter, entries, id) {
  if (entries.length > 1) {
    setter(entries.filter((e) => e.id !== id));
  }
}