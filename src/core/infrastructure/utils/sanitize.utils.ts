const accents = (value: string) => {
  const clean = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return clean;
};

export default { accents };
