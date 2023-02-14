/* =============================
📦 COMPONENT - Textarea
============================= */
const Textarea = ({ label, name, id, value, onChange, placeholder }) => (
  <div className='grid gap-1'>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700'
    >{label}
    </label>
    <div className=''>
      <textarea
        className='block p-2 border w-full rounded-md resize-none min-h-[100px]'
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  </div>
);

export default Textarea;
