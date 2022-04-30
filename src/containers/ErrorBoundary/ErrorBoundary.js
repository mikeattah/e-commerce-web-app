import React, { Component } from "react";
import Error from "../../components/Error/Error";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.toString() };
  }

  componentDidCatch(error, info) {
    this.logErrorToConsole(error.toString(), info.componentStack);
  }

  logErrorToConsole = () => console.error;

  render() {
    if (this.state.hasError) {
      return <Error error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
