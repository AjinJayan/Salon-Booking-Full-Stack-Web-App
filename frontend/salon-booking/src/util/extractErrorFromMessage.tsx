export function extractErrorMessage(errorString: string) {
  try {
    if (errorString.includes("{") && errorString.includes("}")) {
      const jsonStart = errorString.indexOf("{");
      const jsonEnd = errorString.lastIndexOf("}") + 1;
      const jsonPart = errorString.substring(jsonStart, jsonEnd);
      const errorObj = JSON.parse(jsonPart);
      return errorObj.errorMessage || "Unknown error";
    } else {
      return errorString;
    }
  } catch (err) {
    return "Invalid data";
  }
}
