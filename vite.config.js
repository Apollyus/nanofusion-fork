import { defineConfig } from 'vite';

export default defineConfig({
  // public/static/ je AKTUÁLNÍ verze JS souborů — servujeme ji s prioritou (Vite default)
  // root static/ je starší verze a je ignorována, protože public/ má prioritu
  publicDir: 'public',

  server: {
    port: 5173,
    host: true,
  },
});
