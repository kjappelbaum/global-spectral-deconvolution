import { gsd } from '..';

describe('Simple test cases', () => {
  let X = [];
  let Y = [];
  for (let i = 0; i < 10; i++) {
    X.push(X.length);
    Y.push(0);
  }
  for (let i = 0; i <= 10; i++) {
    X.push(X.length);
    Y.push(i > 5 ? 10 - i : i);
  }
  for (let i = 0; i < 10; i++) {
    X.push(X.length);
    Y.push(0);
  }

  it('gsd not realtop', () => {
    let peaks = gsd(X, Y, {
      realTopDetection: false,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    });

    expect(peaks[0].y).toBeCloseTo(4.657, 3);
    expect(peaks[0].base).toBeCloseTo(1.1956, 3);
    expect(peaks[0].x).toStrictEqual(15);
  });

  it('gsd not realtop asymetric', () => {
    let Y2 = Y.slice(0);
    Y2[14] = 5;
    let peaks = gsd(X, Y2, {
      realTopDetection: false,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    });

    expect(peaks).toStrictEqual([
      {
        base: 1.2434539324230613,
        index: 15,
        left: {
          index: 13,
          x: 13,
        },
        right: {
          index: 16,
          x: 16,
        },
        soft: false,
        width: 3,
        x: 15,
        y: 5,
      },
    ]);
  });

  it('gsd realtop', () => {
    let Y2 = Y.slice();
    Y2[14] = 5;
    let peaks = gsd(X, Y2, {
      realTopDetection: true,
      smoothY: false,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    });
    expect(peaks).toStrictEqual([
      {
        base: 1.2434539324230613,
        index: 15,
        left: {
          index: 13,
          x: 13,
        },
        right: {
          index: 16,
          x: 16,
        },
        soft: false,
        width: 3,
        x: 14.5,
        y: 4.006546067576939,
      },
    ]);
  });
});
