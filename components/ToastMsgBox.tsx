const MsgBox = ({ MsgError }) => {
  const { name, errors, fields, parent } = MsgError.message;

  return (
    <div>
      <h2>
        {parent.errno} | {parent.code}
      </h2>
      <ul>
        {errors &&
          errors.map((error, index) => (
            <li key={index}>
              <strong>{error.message}</strong>
              <br />
              {error.path}: {error.value}
            </li>
          ))}
      </ul>
      {/* <p>Fields: {Object.keys(fields).join(", ")}</p> */}
    </div>
  );
};
export default MsgBox;
