const Warning = ({msg="Check This field"}) => {
  return (
    <p className='absolute top-3/4 left-1/2 px-2 py-1 text-xs shadow-md rounded-md bg-white whitespace-nowrap bg-opacity-90 border border-red-400 pointer-events-none'>
      {msg}
    </p>
  )
}

export default Warning