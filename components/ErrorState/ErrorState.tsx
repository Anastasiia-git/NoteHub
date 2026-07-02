import css from "./ErrorState.module.css";

type ErrorStateProps = {
  message: string;
  details?: string;
  onRetry: () => void;
};

export default function ErrorState({
  message,
  details,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={css.errorState}>
      <h2>{message}</h2>
      {details && <p>{details}</p>}
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
