import * as config from '~/config/default';

import { setWithKey, getByKey } from '~/utils/redis';

export const incrementCount = async () => {
  const count = await getByKey(config.redis.searchCountKey);

  await setWithKey(config.redis.searchCountKey, String(count ? Number(count) + 1 : 1), 0);
};

export const getCount = async () => {
  const count = await getByKey(config.redis.searchCountKey);

  return count ? Number(count) : 0;
};
