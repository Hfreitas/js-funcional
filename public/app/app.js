import { appService } from "./services.js";
import {
  takeUntil,
  debounceTime,
  partialize,
  pipe,
} from "./utils/operators.js";
import { logger } from "./utils/logger.js";
import { timeoutPromise, retry } from "./utils/promise-helpers.js";
import { EventEmitter } from "./utils/event-emitter.js";

const fetchNotas = () => {
  return retry(3, 3000, () => timeoutPromise(appService.sumItems("2143"), 1500))
    .then((response) => EventEmitter.emit("itemsTotal", response))
    .catch(logger);
};

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);
const action = operations(fetchNotas);

document.getElementById("myButton").addEventListener("click", action);
