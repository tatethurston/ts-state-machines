type ValueOf<T> = T[keyof T];

type StateMachineConfig = {
  initialState: string;
  states: {
    [state: string]: {
      [action: string]: string;
    };
  };
};

export type StateMachineInstance<Config extends StateMachineConfig> = ValueOf<
  StateMachineAtoms<Config>
>;

type StateMachineAtoms<Config extends StateMachineConfig> = {
  [State in keyof Config["states"]]: { state: State } & {
    [Action in keyof Config["states"][State]]: () => StateMachineAtoms<Config>[Config["states"][State][Action]];
  };
};

type StateMachineFactory<Config extends StateMachineConfig> = {
  (): StateMachineAtoms<Config>[Config["initialState"]];
  config: Config;
};

export function StateMachine<Config extends StateMachineConfig>(
  config: Config
): StateMachineFactory<Config> {
  const stateMachineFactory: StateMachineFactory<Config> = () => {
    const atoms = {} as StateMachineAtoms<Config>;
    for (const state in config.states) {
      const atom = {
        state,
      } as StateMachineAtoms<Config>[keyof Config["states"]];
      const transitions = config.states[state];
      for (const action in transitions) {
        const nextState = config.states[state][action];
        // eslint-disable-next-line
        atom[action as keyof typeof atom] = (() => atoms[nextState]) as any;
      }
      atoms[state as keyof Config["states"]] = atom;
    }

    return atoms[config.initialState];
  };

  stateMachineFactory.config = config;

  return stateMachineFactory;
}
