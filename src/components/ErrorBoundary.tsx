import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
          <p className="font-display text-4xl uppercase text-[var(--color-volt)]">
            Something broke.
          </p>
          <p className="mt-4 max-w-md font-mono text-sm text-[var(--color-fg-muted)]">
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-volt mt-8"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
