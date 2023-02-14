/* =============================
📦 COMPONENT - Input
============================= */
const Input = ({ label, type, name, id, value, onChange, placeholder }) => {
  /* =============================
  📦 RENDERING
  ============================= */
  return <div className='grid gap-1'>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700'
    >{label}
    </label>
    <div className=''>
      <input
        className='block p-2 border w-full rounded-md'
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  </div>;


};

export default Input;
