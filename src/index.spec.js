const index = require('.');

describe('index', () => {
  it('should have instance', () => {
    expect(index.getInstance).toBeTruthy();
  });

  it('should start application', () => {
    let listen = spyOn(index.getInstance(), 'listen');

    index.start();

    expect(listen).toHaveBeenCalled();
  });

  it('should stop application', () => {
    setTimeout(() => {
      let close = spyOn(index.getServer(), 'close');

      index.stop();

      expect(close).toHaveBeenCalled();
    }, 500);
  })
});