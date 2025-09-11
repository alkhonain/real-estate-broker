import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4" dir="rtl">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ غير متوقع</h1>
            <details className="mt-4">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                تفاصيل الخطأ (للمطورين)
              </summary>
              <div className="mt-2 p-4 bg-gray-100 rounded text-left" dir="ltr">
                <pre className="text-xs overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              إعادة تحميل اللعبة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;