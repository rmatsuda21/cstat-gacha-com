// Combine multiple react router loaders into one
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loader = () => Promise<Response | NonNullable<unknown> | null>;
const multiLoader = async (
  loaders: Loader[]
): Promise<Response | NonNullable<unknown> | null> => {
  const res = await Promise.all(loaders.map((loader) => loader()));
  return Object.assign({}, ...res);
};

export default multiLoader;
