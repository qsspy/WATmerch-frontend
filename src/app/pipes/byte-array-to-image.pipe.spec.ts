import { ByteArrayToImagePipe } from './byte-array-to-image.pipe';

describe('ByteArrayToImagePipe', () => {
  it('create an instance', () => {
    const pipe = new ByteArrayToImagePipe();
    expect(pipe).toBeTruthy();
  });
});
