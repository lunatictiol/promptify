export function getModelForTask(task) {
  switch (task) {
    case "tagline":
      return "mistral";
    case "resume":
      return "phi3";
    default:
      return "llama3";
  }
}
