import { readFileSync } from 'fs';

const filePath = process.argv[2];
const buffer = readFileSync(filePath);

const commands = buffer.toString().split(/\r?\n/);
console.log('commands', commands);
