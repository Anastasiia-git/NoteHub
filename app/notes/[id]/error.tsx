"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Could not fetch the list of notes.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Спробувати знову</button>
    </div>
  );
};

export default Error;
