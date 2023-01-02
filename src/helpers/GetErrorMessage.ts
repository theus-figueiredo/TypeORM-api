export default function getErrorMessage (error: any): any {
  if(error instanceof Error) return error.message;
  return error;
};
