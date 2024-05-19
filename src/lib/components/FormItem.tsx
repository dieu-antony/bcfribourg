

type FormItemProps = {
  type: string;
  label: string;
  labelName: string;
  options?: string[];
  className: string;
  required?: boolean;
  onChange?: (e: any) => void;
  value?: string;
};
const FormItem = ({
  type,
  label,
  labelName,
  options,
  className,
  value,
  required,
  onChange,
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
          onChange={onChange}
            name={label}
            id={label}
            className="form-select block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
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
          onChange={onChange}
            name={label}
            rows={3}
            required
            id={label}
            className="form-textarea block w-full resize-none rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
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
            onChange={onChange}
            name={label}
            type={type}
            id={label}
            className="form-input block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
            multiple={type == "file"}
            pattern={
              type == "tel"
                ? "[0-9]{10}"
                : type == "avs"
                  ? "756.[0-9]{4}.[0-9]{4}.[0-9]{2}"
                  : undefined
            }
            placeholder={
              type == "tel"
                ? "0791234567"
                : type == "avs"
                  ? "756.1234.5678.97"
                  : ""
            }
            required={required}
            value={value}
          />
        </div>
      </div>
    );
  }
};

export default FormItem;
