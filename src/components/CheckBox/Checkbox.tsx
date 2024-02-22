type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange
}: CheckboxProps) => (
  <>
    <input id={`column_${id}`} type="checkbox" checked={checked} onChange={onChange} />
    <label htmlFor={`column_${id}`}>{label}</label>
  </>
);
