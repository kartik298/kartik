type Props = {
  name: string;
};

export function LabelText({ name }: Props) {
  return (
    <label className="font-normal mt-3" htmlFor={name}>
      {name}
    </label>
  );
}
