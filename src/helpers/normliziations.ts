export const errorNorm = (err: any) => ({
  name: err.response.data.error,
  message: err.response.statusText,
});

export const objectErrorNorm = (err: any) => ({
  name: Object.values(err.response.data.error)[0],
  message: err.response.statusText,
});
