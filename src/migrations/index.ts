import * as migration_20250430_080534_migration from './20250430_080534_migration';

export const migrations = [
  {
    up: migration_20250430_080534_migration.up,
    down: migration_20250430_080534_migration.down,
    name: '20250430_080534_migration'
  },
];
