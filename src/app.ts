import { readFileSync } from 'fs';
import handleCommand from './handleCommand';

const filePath = process.argv[2];
const buffer = readFileSync(filePath);

let commands = buffer.toString().split(/\r?\n/);
commands.forEach(command => command.length && handleCommand(command.split(/\s/)));
