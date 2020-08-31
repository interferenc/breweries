# Folds: rendering optional values

In this application, `Option` is used to hold any value that might not be present. This forces the handling of the not set case, there is no way to forget about null or undefined values.

To make writing components easier, a list of folds have been compiled that take an optional value and turn it into something that Vue can render.

## Option

```ts
import { h } from 'vue';
import { some, none } from 'fp-ts/lib/Option'
import * as option from '@/ui/folds/option';

// fold Option<string> into string
console.log(option.toString(some('foo'))) // 'foo'
console.log(option.toString(none)) // ''

// fold Option<string> into Vnode
console.log(option.toVNodes((v: string) => h('p', v))(some('bar'))) // VNode type: p with 'bar' as content
console.log(option.toVNodes((v: string) => h('p', v))(none)) // null, will not be rendered by Vue
```

### Additional helpers

Since these folds are curried, it is very easy to create reusable helpers.

```ts
// convert an option to an anchor
export const toLink = toVNodes((v: string) => h("a", { href: v }, v));

// convert an option to a paragraph
export const toParagraph = toVNodes((v: string) => h("p", v));
```

## TaskState

A `TaskState` is structure that holds the current status of an asynchronous API call. To make working with this structure easier, there is a fold that takes a callback for each possible state.

```ts
import * as ts from '@/ui/folds/taskState';
import { ApiTaskState } from "@/ui/concerns/apiTask/ApiTaskState";

const taskState: ApiTaskState = { pending: false };

// maps every possible state to the same type, in this case a VNode
const result = ts.toVNodes(
  () => h('p', 'initial'),
  () => h('p', 'loading'),
  (error) => h('p', `error ${JSON.stringify(error)}`),
  (result) => h('p', `success ${JSON.stringify(result)}`),
)(taskState);

// there is also a helper with an partially applied empty initial state a default loader
const result2 = ts.toVNodesPending(
  (error) => h('p', `error ${JSON.stringify(error)}`),
  (result) => h('p', `success ${JSON.stringify(result)}`),
)(taskState)
