import type { Config } from 'tailwindcss';

export default {
  content: ['./src/client/ui/**/*.{html,tsx,ts}'],
  theme: { extend: {} },
  plugins: []
} satisfies Config;