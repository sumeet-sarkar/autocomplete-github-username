export default function debounce(func: (...args: any[]) => any, delay: number) {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
