import Element from "@/lib/Element";
import { createContext, useContext, useReducer } from "react";

type State = {
  elements: Element[];
};

type Action = { type: "set"; payload: Element[] }
  | { type: "update"; payload: Element };

const ElementsContext = createContext<{
  state: State,
  dispatch: React.Dispatch<Action>
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set":
      return { elements: action.payload };
    case "update":
      const newState: Element[] = [];

      for (const element of state.elements) {
        if (action.payload.getId() && element.getId() === action.payload.getId()) {
          newState.push(action.payload);
        } else {
          newState.push(element);
        }
      }

      return { elements: newState };
    default:
      return state;
  }
}

export function ElementsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { elements: [] });

  return (
    <ElementsContext.Provider value={{ state, dispatch }}>
      {children}
    </ElementsContext.Provider>
  )
}

export function useElements() {
  const ctx = useContext(ElementsContext);

  if (!ctx) {
    throw new Error("useElements must be used inside ElementsProvider");
  }

  return ctx;
}