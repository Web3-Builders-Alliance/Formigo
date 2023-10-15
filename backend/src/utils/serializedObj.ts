export function serializeObject(obj: any) {
  // Create a new object to store the filtered properties
  const result: any | {} = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check if the value is not undefined or null
      if (value !== undefined && value !== null) {
        // Recursively handle nested objects
        if (typeof value === "object" && !Array.isArray(value)) {
          result[key] = serializeObject(value);
        } else if (Array.isArray(value)) {
          // Handle arrays with nested objects
          result[key] = value.map((item) => {
            if (typeof item === "object" && !Array.isArray(item)) {
              return serializeObject(item);
            }
            return item;
          });
        } else {
          result[key] = value;
        }
      }
    }
  }

  return result;
}
