import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
const full = resolveConfig(tailwindConfig);
export const twColors = full.theme?.colors as Record<string, any>;
