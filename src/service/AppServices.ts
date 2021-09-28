interface IHistory {
  push: (path: string, state?: any) => any;
  goBack: () => any;
}

class AppServices {
  static history?: IHistory;

  static scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}

export default AppServices;
