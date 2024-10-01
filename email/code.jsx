export const CodeTemplate = ({ code }) => (
  <div>
    <h1>Your code is {`${code.slice(0, 4)}-${code.slice(4)}`}</h1>
  </div>
);
