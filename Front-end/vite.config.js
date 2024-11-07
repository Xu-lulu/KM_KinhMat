import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import envVars from "vite-plugin-env";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{
  //   port:6369
  // }
  proxy: {
    "/api": {
      target: "http://localhost:3000", // Chuyển hướng yêu cầu từ /api đến http://localhost:3000
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""), // Loại bỏ /api từ yêu cầu gửi đến máy chủ API
    },
  },
});
