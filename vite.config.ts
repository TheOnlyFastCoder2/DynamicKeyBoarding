import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const setPath = (dir) => {
  return path.resolve(__dirname,dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // publicDir:"./public",
  // build: {
  //   outDir: "../"
  // },
  resolve: {
    alias: {
      "lib": setPath("./src/lib"),
      "imgs": setPath("./src/assets/imgs"),
      "store": setPath("./src/store"),
      "game": setPath("./src/game"),
      "styles": setPath("./styles"),
      "components": setPath("./src/components"),
    }
  }
})