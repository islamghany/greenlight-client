export const errorNorm = (err: any) =>
  typeof err.response.data.error === 'string'
    ? stringErrorNorm(err)
    : objectErrorNorm(err);

const stringErrorNorm = (err: any) => ({
  name: err.response.data.error,
  message: err.response.statusText,
});
const objectErrorNorm = (err: any) => ({
  name: Object.values(err.response.data.error)[0],
  message: err.response.statusText,
});
