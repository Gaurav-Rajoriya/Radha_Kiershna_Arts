import { Component, ReactNode } from 'react'
export default class ErrorBoundary extends Component<{ children: ReactNode }, { bad: boolean }> {
  state = { bad: false }
  static getDerivedStateFromError() { return { bad: true } }
  render() { return this.state.bad ? <div className="loading">Something went wrong loading this section. Please refresh the page.</div> : this.props.children }
}
