"use client";

import ErrorState from "@/components/ErrorState/ErrorState";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <ErrorState
      message="Could not fetch this note."
      details={error.message}
      onRetry={reset}
    />
  );
};

export default Error;
