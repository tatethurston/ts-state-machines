import { StateMachine, StateMachineInstance } from ".";

describe("Stoplight", () => {
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

  it('starts at the "initialState"', () => {
    const stoplight = Stoplight();

    expect(stoplight.state).toEqual("red");
  });

  it("progresses through the states", () => {
    let stoplight: StateMachineInstance<typeof Stoplight.config>;

    stoplight = Stoplight();
    expect(stoplight.state).toEqual("red");

    stoplight = stoplight.timer();
    expect(stoplight.state).toEqual("green");

    stoplight = stoplight.timer();
    expect(stoplight.state).toEqual("yellow");

    stoplight = stoplight.timer();
    expect(stoplight.state).toEqual("red");
  });
});

describe("Promise", () => {
  const PromiseMachine = StateMachine({
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

  it("reaches terminal states", () => {
    const promise = PromiseMachine();

    expect(promise.start().resolve().state).toEqual("resolved");
    expect(promise.start().reject().state).toEqual("rejected");
  });
});
