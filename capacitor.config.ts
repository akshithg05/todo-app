import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.todoapp.app",
  appName: "Tasq",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
