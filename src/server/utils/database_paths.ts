import { rootResolve } from './root_resolve';

export const DATABASE_PATH =
  process.env.IS_GAE === 'true' ? '/tmp/database.sqlite' : rootResolve('databases/database.sqlite');
export const DATABASE_SEED_PATH = rootResolve('databases/database.seed.sqlite');
