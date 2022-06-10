const DEFAULT_LIMIT = 15;

export const getSkip = ({
  page = 0,
  limit = DEFAULT_LIMIT,
}: {
  page: number;
  limit: number;
}) => {
  const numberPerPage = Number(limit);
  const pageNumber = Number(page);
  return pageNumber > 0 ? (pageNumber - 1) * numberPerPage : 0;
};

export default {
  getSkip,
};
