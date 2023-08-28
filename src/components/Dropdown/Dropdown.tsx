export type DropdownProps = {
  label: string
  value?: string
  options: string[]
  onChange: (value: string) => void
}

const Dropdown = ({ label, value, options, onChange }: DropdownProps) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        value={value}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 p-2.5 min-w-[200px]"
        onChange={(e) => onChange(e.target.value)}
        data-testid="select"
      >
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
