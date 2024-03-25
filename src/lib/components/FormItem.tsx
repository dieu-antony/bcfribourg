type FormItemProps = {
  type: string;
  label: string;
  labelName: string;
  options?: string[];
  className: string;
};
const FormItem = ({
  type,
  label,
  labelName,
  options,
  className,
}: FormItemProps) => {
  if (type == "select") {
    return (
      <div className={className}>
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {labelName}
        </label>
        <div className="mt-2">
          <select
            id={label}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {options?.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>
    );
  } else if (type == "textarea") {
    return (
      <div className={className}>
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {labelName}
        </label>
        <div className="mt-2">
          <textarea
            rows={3}
            required
            id={label}
            className="resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className={className}>
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {labelName}
        </label>
        <div className="mt-2">
          <input
            type={type}
            id={label}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  }
};

export default FormItem;
