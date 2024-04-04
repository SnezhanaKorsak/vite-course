import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

type ViteConfig = UserConfig & { test: InlineConfig };

const ports: { [key: string]: number } = {
  development: 3000,
  staging: 9000,
};

export default defineConfig(({ mode }) => {
  const generateScopedName =
    mode === "production"
      ? "[local]_[hash:base64:2]" // count-value_FC
      : "[name]_[local]_[hash:base64:5]"; // App-module_count-value_FC5ng

  const isDev = mode === "development";

  return defineConfig({
    /** Режим разработки. Default: 'development' для serve, 'production' для build */
    mode,
    /** Префикс для env переменных */
    envPrefix: ["APP", "VITE"],
    /** Настройки для деплоя приложения */
    basename: "/vite-course/",
    /** Настройки для сервера */
    server: {
      port: ports[mode],
      strictPort: true,
      // Или через плагин vite-plugin-server-headers
      headers: {
        "CUSTOM-HEADERS": "*",
      },
    },
    plugins: [
      react(),
      /** Для работы с иконками как компонентами */
      svgr(),
      /** Для оптимизации изображений */
      ViteImageOptimizer({
        jpg: {
          quality: 75,
        },
        jpeg: {
          quality: 75,
        },
        png: {
          quality: 40,
        },
      }),
      /** Для анализа бандла */
      isDev && Inspect(),
      /** Для проверки типов */
      checker({
        typescript: true,
      }),
    ],
    /** Настройка поведения CSS modules */
    css: {
      modules: {
        /** Генерация кастомного имени класса */
        generateScopedName,
      },
    },
    resolve: {
      alias: {
        "@/components": "/src/components",
        "@/assets": "/src/assets",
      },
      /** Список расширений файлов, которые будут импортированы без расширений. */
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"],
    },
    /*build: {
      /!** Название  output директории *!/
      outDir: "dist",
      /!** Директория для вложения сгенерированных ресурсов (assets) относительно outDir *!/
      assetsDir: "assets",
      /!** Включить/отключить разделение CSS кода на файлы *!/
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name?.split(".")[1] as string;
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/chunks/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
    },*/
  } as ViteConfig);
});
