export class MyService {
  add(...args: number[]) {
    return args.reduce((a, b) => a + b);
  }
  minus(...args: number[]) {
    return args.reduce((a, b) => a - b);
  }
}
