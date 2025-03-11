import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import envVars from "vite-plugin-env";
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  // server:{
  //   port:6369
  // }
  proxy: {
    "/api": {
      // Đây là prefix bạn muốn dùng cho các request đến backend
      target: "http://localhost:3000", // URL của backend server
      changeOrigin: true, // Bắt buộc nếu backend server không cùng origin với frontend
      rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Xóa prefix /api khỏi path trước khi forward request
    },
    // Nếu bạn có nhiều API server khác nhau
    "/api2": {
      target: "https://provinces.open-api.vn/api/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api2/, ""),
    },
  },
  //cho phép dùng prcess.env
});
