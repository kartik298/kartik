type Props = {
  name: string;
};

export function MainText({ name }: Props) {
  return (
    <label
      className="font-bold text-2xl relative -top-20 grid place-items-center"
      htmlFor={name}>
      {name}
    </label>
  );
}
