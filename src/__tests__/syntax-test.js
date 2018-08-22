// check for for focus and exclude jasmine blocks
import fs from 'fs';
import glob from 'glob';

const BLACK_LIST = ['fdescribe', 'fit', 'xdescribe', 'xit', 'it\\.only', 'describe\\.only'];
const REGEXS = BLACK_LIST.map(token => new RegExp(`^\\s*${token}\\(.*`));

describe('Syntax and test validation', () => {
  describe(`ensures ${BLACK_LIST} is not present in tests`, () => {
    const files = glob.sync('**/__tests__/*.js');
    files.forEach(file =>
      it(`checks ${file} for test checks`, () => {
        const code = fs.readFileSync(file, {encoding: 'utf-8'});
        code.split('\n').forEach(line => {
          expect(REGEXS.some(re => re.test(line))).toBe(false);
        });
      })
    );
  });
});
