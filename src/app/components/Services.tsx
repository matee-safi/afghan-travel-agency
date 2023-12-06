import Image from 'next/image';
import visa from 'public/visa.png';
import scholarship from 'public/scholarship.png';
import ticket from 'public/ticket.png';
import immigration from 'public/immigration.png';
import Link from 'next/link';

const services = () => {
  return (
    <section id="services">
      <div className="container mx-auto">
        <h1 className="m-5 mt-10 text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-red-900 to-red-400">خدمات ما</h1>
        <div className="p-5 md:grid md:grid-cols-2">

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image src={visa} alt="Visa" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-ellipsis text-orange-300">خدمات ویزه</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">ما برای بسیاری از کشورها از جمله پاکستان، ایران، قطر و غیره کمک های ویزه ارائه می دهیم. شما می توانید با فشار دادن دکمه زیر تمامی بسته های ویزه و قیمت آنها را مشاهده کنید</p>
            <Link className="btn-primary" href="packages?category=visa">
              <button className="btn-hover btn-color">مشاهده بسته های ویزه</button>
            </Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image src={scholarship} alt="Visa" />
            </div>
            <h3  className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 text-ellipsis text-orange-300">بورسیه های تحصیلی</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">ما برای بسیاری از کشورها از جمله انگلستان، اسکاتلند، بلاروس و غیره بورس های تحصیلی ارائه می دهیم. تیم مشاوران حرفه ای ما در هر مرحله از سفر به شما کمک میکنند</p>
            <Link className="btn-primary" href="packages?category=scholarship">
              <button className="btn-hover btn-color">مشاهده بسته های تحصیلی</button>
            </Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image src={ticket} alt="Visa" />
            </div>
            <h3  className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 text-ellipsis text-orange-300">خدمات تکت</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">ما در ارائه ارزان‌ترین تکت‌ها برای پروازهای داخلی و خارجی تخصص داریم و از گزینه‌های سفر مقرون به صرفه برای همه سفرها و مقصدهای شما اطمینان می‌دهیم</p>
            <Link className="btn-primary" href="packages?category=ticket">
              <button className="btn-hover btn-color">مشاهده بسته های تکت</button>
            </Link>
          </div>

          <div className="text-center flex flex-col items-center my-10">
            <div className="p-10 w-fit bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 m-5 rounded-full flex items-center justify-center">
              <Image width={128} height={128} src={immigration} alt="Visa" />
            </div>
            <h3  className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 text-ellipsis text-orange-300">پرونده های پناهندگی</h3>
            <p className="mb-3 mx-4 max-w-sm lg:text-xl">ما پیشنهادات پناهندگی را به کشورهای مختلف با شرایط عالی ارائه می دهیم، شما پول خود را در یک صرافی مسدود می کنید و زمانی که به مقصد خود رسیدید به ما پرداخت می کنید</p>
            <Link className="btn-primary" href="packages?category=asylum">
              <button className="btn-hover btn-color">مشاهده بسته های تکت</button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
 
export default services;
