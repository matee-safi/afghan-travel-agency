const Footer = () => {
  return (
    <section id="footer">
      <div className="container mx-auto">
        <div className="text-center m-7">
          <h1 className="text-3xl md:text-4xl lg:text-5xl md:mt-20 mb-1 mt-10 text-center logo-text">Afghan Travel Agency</h1>
          <p className="text-center md:text-lg lg:text-2xl mb-2 font-bold">ATA Online Sevices - Company Number:<br /> +93 785 105 088</p>
          <p className="text-center md:text-lg lg:text-2xl">Terms & Conditions | Privacy Policy | Disclaimer</p>
        </div>
        <p className="text-center md:mt-10 lg:mt-20 md:text-lg lg:text-xl border-t border-gray-900 p-2">© 2023. All rights reserved by ATA</p>
      </div>
    </section>
  );
}

export default Footer;