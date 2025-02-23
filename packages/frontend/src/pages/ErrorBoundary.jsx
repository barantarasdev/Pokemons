import React, { Component } from 'react';
import styles from './styles.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className={styles.specificPageTitle}>
          Something went wrong. Please try again later
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
