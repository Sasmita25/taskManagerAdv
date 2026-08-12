
type FilterDropdownProps = {
  label: string
  options: string[]
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export default function FilterDropdown({ label, options ,onChange }: FilterDropdownProps) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <select
        onChange={onChange}
        className="cursor-pointer bg-transparent text-sm font-medium text-gray-900 focus:outline-none dark:text-gray-100"
      >
      
        {options.map((option) => (
          <option key={option} value={option} >
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
