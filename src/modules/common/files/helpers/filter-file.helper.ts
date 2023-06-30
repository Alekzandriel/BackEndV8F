export const filterFileHelper = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (...args: unknown[]) => unknown,
) => {
  return callback(null, true);
};
