let apiRoot = "";
console.log(import.meta.env)
console.log(process.env);

if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:3000";
}
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://km-kinhmat-1.onrender.com";
}
console.log("api_root", apiRoot);
export const API_ROOT = apiRoot;
