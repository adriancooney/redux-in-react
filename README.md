# Redux in plain React
An *extremely* simple (to the point of being unnecessary) implementation of Redux using only React to manage the state of the app.

It works by either extending the `Provider` component (the default export) as the root component of you app, or instantiating the `Provider` component directly and pass it a `reduce` prop with your reducer function. You can then access the `getState` and `dispatch` functions via `contextTypes`.

You are now delegating the state management to React and storing your global state in the root `Provider` component. Right now, performance will be pretty poor in comparison to Redux because state mutations will trigger an entire re-render however in future versions of React, especially with it's ambitious Fiber project, this could potentially a neat approach to managing your state.

Use cases for this:

* Small (tiny) apps.
* Components that require their own state but don't want full blown `redux`.
* Learning about Redux.

Example usage:

```jsx
import Provider from "redux-in-react";

export default class App extends Provider {
    state = {
        value: 0
    }

    reduce(state, action) {
        switch(action.type) {
            case "INCREMENT":
                return { value: state.value + 1 };

            case "DECREMENT":
                return { value: state.value - 1 };
        }

        return state;
    }

    render() {
        const increment = () => this.dispatch({ type: "INCREMENT" });
        const decrement = () => this.dispatch({ type: "DECREMENT" });

        return (
            <div>
                <span>Value: {this.state.value}</span>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div>
        );
    }
}
```

See [`src/index.js`](src/index.js) for implementation. It's less than 60 lines.