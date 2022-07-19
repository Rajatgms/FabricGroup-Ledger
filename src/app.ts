import { readFileSync } from 'fs';
import handleCommand from './controllers/handleCommand';

const filePath = process.argv[2];
const buffer = readFileSync(filePath);

let commands = buffer.toString().split(/\r?\n/);
commands.map(command => command.split(/\s/)).forEach(handleCommand);
