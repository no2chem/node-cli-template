#!/usr/bin/env node

import * as commander from 'commander';
import * as ora from 'ora';
import * as path from 'path';

const packagejson = require('root-require')('package.json');

commander
    .description('nodejs CLI template')
    .version(packagejson.version);

/**
 * Launch a task with a spinner. The spinner is removed when the promise is fulfilled.
 * 
 * @param task  The task to launch a spinner for.
 * @param text  The text to display on the screen.
 * 
 * @returns     A promise which is fulfilled with the same value as the original promise.
 */
const spinnerTask = async<T>(task: Promise<T>, text: string): Promise<T> => {
  const spinner = ora(text).start();
  try {
    const retVal: T = await task;
    spinner.succeed();
    return retVal;
  } catch (e) {
    spinner.fail();
    throw e;
  }
};

/**
 * Generate a promise which is fulfilled after a given amount of time.
 * 
 * @param ms  The number of milliseconds it should take to fulfill the promise.
 */
const delayTask = (ms : number) => new Promise(_ => setTimeout(_, ms));

// Place logic here
const helloTask = async() => {
  console.log("Hello World");
};

// Place your commands here
commander.command('test')
    .description('a test command')
    .action(async () => {
      await spinnerTask(delayTask(5000), "Waiting...");
      await helloTask();
    });

commander.parse(process.argv);
if (!process.argv.slice(2).length) {
  commander.outputHelp();
  process.exit(1);
}