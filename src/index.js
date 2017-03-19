import React, { Component } from "react";

export default class Provider extends Component {
    static childContextTypes = {
        dispatch: React.PropTypes.func,
        getState: React.PropTypes.func
    };

    getChildContext() {
        return {
            dispatch: this.dispatch.bind(this),
            getState: this.getState.bind(this)
        }
    }

    dispatch(action) {
        this.intermediateState = this.reduce(this.intermediateState || this.state, action);

        if(this.intermediateState !== this.state) {
            Component.prototype.setState.call(
                this,
                this.intermediateState,
                // Only schedule one callback to remove the intermediate state
                !this.intermediateState ? () => this.intermediateState = null : undefined
            );
        }

        return action;
    }

    setState() {
        throw new Error("You cannot set state directly, you must dispatch an action and mutate the state in the reducer.");
    }

    getState() {
        return this.intermediateState || this.state;
    }

    reduce(state, action) {
        return state;
    }
}

export class Connector extends Component {
    static contextTypes = {
        dispatch: React.PropTypes.func,
        getState: React.PropTypes.func
    };

    dispatch(action) {
        return this.context.dispatch(action);
    }

    getState() {
        return this.context.getState();
    }
}