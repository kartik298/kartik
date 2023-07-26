const Logo = ({ logo_src, customStyle }) => {
  return (
    <>
      <a href="https://www.bosonqpsi.com">
        <img className={`${customStyle}`} src={logo_src} />
      </a>
    </>
  );
};

export { Logo };