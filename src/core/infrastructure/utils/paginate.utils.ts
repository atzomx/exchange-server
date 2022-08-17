const DEFAULT_LIMIT = 15;

export const getSkip = ({
  page = 0,
  limit = DEFAULT_LIMIT,
}: {
  page: number;
  limit: number;
}) => {
  if (limit < 0) return 0;
  return page > 0 ? (page - 1) * limit : 0;
};

export default {
  getSkip,
};
