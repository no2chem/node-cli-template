import 'mocha';

import * as chai from 'chai';
import * as path from 'path';

import * as cli from './cli';

const tester = require('cli-tester');
chai.should();

interface CliResult {
  code: number;
  stdout: string;
  stderr: string;
}

// Needed for should.not.be.undefined.
/* tslint:disable:no-unused-expression */

const cliPath = path.join(__dirname, '../build/src/cli.js');

describe('CLI tests', () => {
  it('should exit with code 1 without input', async () => {
    const result: CliResult = await tester(cliPath);
    result.code.should.eq(1);
  });
});