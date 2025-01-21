import type { EventListener } from '../types';

const load = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  callBackFn: (...args: Parameters<EventListener>) => {},
  subscribe(callBackFn: EventListener) {
    this.callBackFn = callBackFn;

    window.addEventListener('load', callBackFn);
  },
  unSubscribe() {
    window.removeEventListener('load', this.callBackFn);
  },
};

export default load;
