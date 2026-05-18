import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SRC_ROOT = path.resolve(process.cwd(), 'src');
const LAYER_ORDER = ['app', 'views', 'widgets', 'features', 'entities', 'shared'];
const LAYERS_WITH_SLICES = ['views', 'widgets', 'features', 'entities'];

const getSliceNames = (layer) => {
  const layerPath = path.join(SRC_ROOT, layer);

  if (!existsSync(layerPath)) return [];

  return readdirSync(layerPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};

const createSameLayerImportZones = () =>
  LAYERS_WITH_SLICES.flatMap((layer) => {
    const sliceNames = getSliceNames(layer);
    return sliceNames.map((slice) => ({
      target: `./src/${layer}/${slice}`,
      from: `./src/${layer}`,
      except: [`./${slice}`],
    }));
  });

const createUpperLayerImportZones = () =>
  LAYER_ORDER.slice(1).map((layer, index) => {
    const restrictedLayers = LAYER_ORDER.slice(0, index + 1);
    const from = restrictedLayers.map((restrictedLayer) => `./src/${restrictedLayer}`);

    return {
      target: `./src/${layer}`,
      from: from.length === 1 ? from[0] : from,
    };
  });

export const fsdImportBoundaryConfig = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,mts}'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        basePath: process.cwd(),
        zones: [...createUpperLayerImportZones(), ...createSameLayerImportZones()],
      },
    ],
  },
};
