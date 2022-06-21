const accents = (value: string) => {
  const clean = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return clean;
};
const clean = (name: string) => name.trim().trimEnd().toLowerCase();

export default { accents, clean };
