const Input = ({ label, type, value, onChange, error }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;