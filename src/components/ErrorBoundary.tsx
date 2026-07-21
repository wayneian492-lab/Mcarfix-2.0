import React, { Component, ReactNode } from "react";
import { AlertOctagon, RefreshCw, Truck } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in mCarFix App:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-signal" />

            <div className="flex justify-center mb-6">
              <div className="p-4 bg-signal/10 rounded-full text-signal animate-pulse">
                <AlertOctagon className="h-10 w-10" />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-3">
              <Truck className="h-5 w-5 text-signal" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
                mCarFix Recovery
              </span>
            </div>

            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">
              System Fault Detected
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A temporary interface error occurred on our support layer. Don't worry, your data and booking requests are perfectly safe.
            </p>

            {this.state.error && (
              <div className="bg-slate-950 border border-white/5 rounded-xl p-3 mb-6 text-left max-h-32 overflow-y-auto">
                <p className="font-mono text-[10px] text-red-400 leading-normal break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full bg-signal text-white hover:bg-signal/90 font-display font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer shadow-lg shadow-signal/20"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
