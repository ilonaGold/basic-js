const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (!date) return "Unable to determine the time of year!";

  try {
    // First check if it's even a Date object
    if (!(date instanceof Date)) {
      throw new Error("Invalid date!");
    }

    // Check if it's a valid Date by using toString and checking time
    if (
      Object.prototype.toString.call(date) !== "[object Date]" ||
      isNaN(date.getTime())
    ) {
      throw new Error("Invalid date!");
    }

    // Check if the object has any own properties (real Date objects shouldn't)
    if (Object.getOwnPropertyNames(date).length > 0) {
      throw new Error("Invalid date!");
    }

    // Additional check - verify that calling methods doesn't throw errors
    // and returns expected types
    const testMonth = date.getMonth();
    if (typeof testMonth !== "number") {
      throw new Error("Invalid date!");
    }

    // Check if the constructor is actually the Date constructor
    if (date.constructor !== Date) {
      throw new Error("Invalid date!");
    }

    // Test that other expected Date methods exist and return proper types
    if (
      typeof date.getFullYear() !== "number" ||
      typeof date.getDate() !== "number" ||
      typeof date.getDay() !== "number"
    ) {
      throw new Error("Invalid date!");
    }

    // One more check - verify the prototype chain
    if (Object.getPrototypeOf(date) !== Date.prototype) {
      throw new Error("Invalid date!");
    }

    // Check for any enumerable properties a real Date wouldn't have
    for (let prop in date) {
      if (date.hasOwnProperty(prop)) {
        throw new Error("Invalid date!");
      }
    }

    const month = date.getMonth();

    if (month >= 2 && month <= 4) {
      return "spring";
    } else if (month >= 5 && month <= 7) {
      return "summer";
    } else if (month >= 8 && month <= 10) {
      return "autumn";
    } else {
      return "winter";
    }
  } catch (e) {
    // If it's a known error, rethrow it
    if (e.message === "Invalid date!") {
      throw e;
    }
    // If any other error occurred while checking, it's probably a fake Date
    throw new Error("Invalid date!");
  }
}

module.exports = {
  getSeason,
};
