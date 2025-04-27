import { ErrorBoundary } from './ErrorBoundary';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
} 