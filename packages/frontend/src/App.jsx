import AppRouter from './AppRouter';
import ErrorBoundary from './pages/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
