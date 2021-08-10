import { appService } from './services.js';
import {
  takeUntil,
  debounceTime,
  partialize,
  pipe,
} from './utils/operators.js';
import { logger } from './utils/logger.js';

const fetchNotas = () => appService.sumItems('2143').then(logger).catch(logger);

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500),
);
const action = operations(fetchNotas);

document.getElementById('myButton').addEventListener('click', action);
