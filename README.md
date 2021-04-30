# TypeScript State Machines

<blockquote>State machines with type safe transitions</blockquote>

<br />

<a href="https://www.npmjs.com/package/ts-state-machine">
  <img src="https://img.shields.io/npm/v/ts-state-machine.svg">
</a>
<a href="https://github.com/tatethurston/ts-state-machine/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/ts-state-machine.svg">
</a>
<a href="https://bundlephobia.com/result?p=ts-state-machine">
  <img src="https://img.shields.io/bundlephobia/minzip/ts-state-machine">
</a>
<a href="https://www.npmjs.com/package/ts-state-machine">
  <img src="https://img.shields.io/npm/dy/ts-state-machine.svg">
</a>
<a href="https://github.com/tatethurston/ts-state-machine/actions/workflows/ci.yml">
  <img src="https://github.com/tatethurston/ts-state-machine/actions/workflows/ci.yml/badge.svg">
</a>

## What is this? 🧐

A TypeScript library to create state machines with type safe transitions. The available state transitions for the current state will autocomplete and type check.

This is accomplished by making each state immutable, with each transition method returning the next state.

## Examples 🚀

### Stoplight

```ts
const Stoplight = StateMachine({
  initialState: "red",
  states: {
    red: {
      timer: "green",
    },
    green: {
      timer: "yellow",
    },
    yellow: {
      timer: "red",
    },
  },
} as const);

const stoplight = Stoplight();

// TypeScript will infer this to be 'red';
stoplight.state;

// TypeScript will infer this to be 'green';
stoplight.timer().state;

// TypeScript will infer this to be 'yellow';
stoplight.timer().timer().state;
```

### Promiselike

```ts
const Promiselike = StateMachine({
  initialState: "pending",
  states: {
    pending: {
      start: "loading",
    },
    loading: {
      resolve: "resolved",
      reject: "rejected",
    },
    resolved: {},
    rejected: {},
  },
} as const);

const promise = Promiselike();

// TypeScript will infer this to be 'resolved';
promise.start().resolve().state;

// TypeScript will infer this to be 'rejected';
promise.start().reject().state;
```

### Maintaining a reference to the latest state

```ts
const Stoplight = StateMachine({
  initialState: "red",
  states: {
    red: {
      timer: "green",
    },
    green: {
      timer: "yellow",
    },
    yellow: {
      timer: "red",
    },
  },
} as const);

let stoplight: StateMachineInstance<typeof Stoplight.config>;

stoplight = Stoplight();
stoplight.state; // 'red'

stoplight = stoplight.timer();
stoplight.state; // 'green'

stoplight = stoplight.timer();
stoplight.state; // 'yellow'

stoplight = stoplight.timer();
stoplight.state; // 'red'
```

## Installation & Usage 📦

1. Add this package to your project:
   - `yarn add ts-state-machines`

## Highlights

🎁 Zero run time dependencies

🪐 Isomorphic / Universal -- safe to run in any JS context: the browser or on a server

🦶 Small footprint [279 B minified and gzipped](https://bundlephobia.com/result?p=ts-state-machines)

## Contributing 👫

PR's and issues welcomed! For more guidance check out [CONTRIBUTING.md](https://github.com/tatethurston/ts-state-machines/blob/master/CONTRIBUTING.md)

## Licensing 📃

See the project's [MIT License](https://github.com/tatethurston/ts-state-machines/blob/master/LICENSE).
