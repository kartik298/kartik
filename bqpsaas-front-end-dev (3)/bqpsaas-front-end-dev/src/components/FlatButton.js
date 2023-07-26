const FlatButton = ({ buttonTxt, width, eventFunction }) => {
  return (
    <button
      className={`border-2 border-blue-300 text-white p-2 w-${width}`}
      onClick={eventFunction}>
      {buttonTxt}
    </button>
  );
};

export { FlatButton };
