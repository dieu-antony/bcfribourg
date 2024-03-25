type FormItemProps = {
  type: string;
  label: string;
  labelName: string;
  options?: string[];
};
const FormItem = ({ type, label, labelName, options }: FormItemProps) => {
  if (type == "select") {
    return (
      <div className="sm:col-span-3">
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {labelName}
        </label>
        <div className="mt-2">
          <select
            id={label}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {options?.map((item) => <option>{item}</option>)}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sm:col-span-3">
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  }
};

export default FormItem;
