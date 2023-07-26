const ListHeader = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  col6,
  customHead,
  customStyle,
  customStyle1,
  customStyle2,
  customStyle3,
  customStyle4,
  customStyle5,
  customStyle6,
}) => {
  return (
    <thead
      className={`text-sm text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ${customHead}`}>
      <tr>
        <th scope="col" className={`px-1 py-2  ${customStyle} ${customStyle1}`}>
          {col1}
        </th>
        <th scope="col" className={`px-6 py-3 ${customStyle} ${customStyle2}`}>
          {col2}
        </th>
        <th scope="col" className={`px-6 py-3  ${customStyle} ${customStyle3}`}>
          {col3}
        </th>
        <th scope="col" className={`px-6 py-3 ${customStyle} ${customStyle4}`}>
          {col4}
        </th>
        <th scope="col" className={`px-6 py-3  ${customStyle} ${customStyle5}`}>
          {col5}
        </th>
        <th scope="col" className={`px-6 py-3  ${customStyle} ${customStyle6}`}>
          {col6}
        </th>
      </tr>
    </thead>
  );
};

export { ListHeader };
