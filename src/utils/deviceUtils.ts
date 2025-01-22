const isBrowser = () => typeof window !== 'undefined';

class IsMobile {
  static android() {
    return /Android/i.test(navigator.userAgent) ? 'android' : false;
  }

  static iOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'ios' : false;
  }

  static any() {
    return this.android() || this.iOS();
  }
}

const isMobileBrowser = () => (isBrowser() ? IsMobile.any() : false);

const isDesktop = () =>
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

export { isBrowser, isDesktop, IsMobile, isMobileBrowser };
