# ApiTask concern

This concern allows a component to dispatch asynchronous API calls in a controlled fashion.

This application wraps all API calls that can fail (so all API calls in reality) into TaskEithers, promising to return either the result of the API call or an `ApiError` object.

## De-duplication

The task can be executed any number of times, even concurrently. When the async operation finishes, the concern checks if the execution is still the last one and only carries on pushing the state to next value when it is indeed the last one. In case it is not the last execution, it just stops and leaves the state in `pending`.

Example usage:

```ts
import { useApiTask } from '@/ui/concerns';

// async operation returning a TaskEither
import { someTask } from '@/services/someAPI';

// set up a task, does not run anything just yet
const { executeTask, taskState } = useApiTask(
  // parameters are re-evaluated on every execution
  () => someTask({ bar: 'foo' })
);

// execute the task when needed
executeTask();

// observe state as it moves through the possible values
const checkState = () => {
  if (taskState.pending) return 'pending';
  if ('error' in taskState) return `error: ${taskState.error}`;
  if ('result' in taskState) return `success: ${taskState.result}`;
  return 'initial state';
}
console.log(checkState());
```
