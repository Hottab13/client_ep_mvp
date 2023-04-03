export const delay = (time:number) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000);
  });