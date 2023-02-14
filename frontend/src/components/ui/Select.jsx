/* =============================
📦 COMPONENT - Select
============================= */
const Select = ({ label, options, name, id, value, onChange }) => (
  <div className='grid gap-1'>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700'
    >{label}
    </label>
    <div className=''>
      <select
        className='block p-2 border w-full rounded-md'
        name={name}
        id={id}
        onChange={(e) => onChange(e)}
        value={value}
      >
        {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
      </select>
    </div>
  </div>
)

export default Select;
