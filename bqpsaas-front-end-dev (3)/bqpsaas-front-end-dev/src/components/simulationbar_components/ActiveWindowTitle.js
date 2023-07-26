function ActiveWindowTitle({ path, current_window }) {
  return (
    <div className="font-medium text-white text-md px-3 py-2">
      <span className="text-gray-400">{path}</span>
      {current_window}
    </div>
  );
}

export default ActiveWindowTitle;
