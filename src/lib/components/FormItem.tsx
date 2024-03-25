type FormItemProps = {
  type: string;
  label: string;
  labelName: string;
  options?: string[];
};
const FormItem = ({
  type,
  label,
  labelName,
  options,
}: FormItemProps) => {
  if (type == "select") {
    return (
      <div className="flex flex-row">
        <label htmlFor={label} className="m-2">{labelName}</label>
        <select id={label}>
          {options?.map((item) => <option>{item}</option>)}
        </select>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <label htmlFor={label} className="m-2">{labelName}</label>
        <input type={type} id={label} />
      </div>
    );
  }
};

export default FormItem;
