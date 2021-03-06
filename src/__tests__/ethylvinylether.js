import { readFileSync } from 'fs';

import { gsd } from '..';

describe('Global spectra deconvolution NMR spectra', () => {
  // Test case obtained from Pag 443, Chap 8.
  it('Ethylvinylether should have 21 peaks', () => {
    let spectrum = JSON.parse(
      readFileSync(`${__dirname}/data/ethylvinylether.json`, 'utf-8'),
    );
    let result = gsd(spectrum[0], spectrum[1], {
      // noiseLevel: 1049200.537996172,
      minMaxRatio: 0.03,
      smoothY: false,
      realTopDetection: true,
      sgOptions: { windowSize: 5, polynomial: 3 },
    });
    // console.log(spectrum[1][13223]);
    // console.log(result);
    expect(result).toHaveLength(21);
  });
});
