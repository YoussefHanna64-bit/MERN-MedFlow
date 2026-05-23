const ErrorMessage = ({
  message = "Something went wrong",
  onRetry,
  className = "",
}) => {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 shrink-0 text-red-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l5.516 9.8c.75 1.33-.213 2.99-1.742 2.99H4.483c-1.529 0-2.492-1.66-1.742-2.99l5.516-9.8zM9 7a1 1 0 112 0v3a1 1 0 11-2 0V7zm1 7a1.25 1.25 0 100 2.5A1.25 1.25 0 0011 14z"
          clipRule="evenodd"
        />
      </svg>

      <div className="flex-1 min-w-0">
        <p className="font-medium">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm text-red-600 underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
