// my css
import img1 from '../../assets/images/slider01.jpg';
import img2 from '../../assets/images/slider02.jpg';
import img3 from '../../assets/images/slider03.jpg';
import './index.css';
import PageTitle from '../pageTitle/pageTitle';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';

const data = [
  {
    id: 1,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '38',
    sura: 'আমি নভোমন্ডল, ভূমন্ডল ও এতদুভয়ের মধ্যবর্তী সবকিছু ক্রীড়াচ্ছলে সৃষ্টি করিনি। ',
  },
  {
    id: 2,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '39',
    sura: 'আমি এগুলো যথাযথ উদ্দেশ্যে সৃষ্টি করেছি; কিন্তু তাদের অধিকাংশই বোঝে না।',
  },
  {
    id: 3,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '40',
    sura: 'নিশ্চয় ফয়সালার দিন তাদের সবারই নির্ধারিত সময়।',
  },
  {
    id: 4,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '41',
    sura: 'যেদিন কোন বন্ধুই কোন বন্ধুর উপকারে আসবে না এবং তারা সাহায্যপ্রাপ্তও হবে না।',
  },
  {
    id: 5,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '42',
    sura: 'তবে আল্লাহ যার প্রতি দয়া করেন, তার কথা ভিন্ন। নিশ্চয় তিনি পরাক্রমশালী দয়াময়।',
  },
  {
    id: 6,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '43',
    sura: 'নিশ্চয় যাক্কুম বৃক্ষ',
  },
  {
    id: 7,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '44',
    sura: 'পাপীর খাদ্য হবে',
  },
  {
    id: 8,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '45',
    sura: 'গলিত তাম্রের মত পেটে ফুটতে থাকবে।',
  },
  {
    id: 9,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '46',
    sura: 'যেমন ফুটে পানি।',
  },
  {
    id: 10,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '47',
    sura: 'একে ধর এবং টেনে নিয়ে যাও জাহান্নামের মধ্যস্থলে,',
  },
  {
    id: 11,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '48',
    sura: 'অতঃপর তার মাথার উপর ফুটন্ত পানির আযাব ঢেলে দাও',
  },
  {
    id: 12,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '49',
    sura: 'স্বাদ গ্রহণ কর, তুমি তো সম্মানিত, সম্ভ্রান্ত।',
  },
  {
    id: 13,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '50',
    sura: 'এ সম্পর্কে তোমরা সন্দেহে পতিত ছিলে।',
  },
  {
    id: 14,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '51',
    sura: 'নিশ্চয়ই মুত্তাকীরা থাকবে নিরাপদ স্থানে,',
  },
  {
    id: 15,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '52',
    sura: 'বাগান আর ঝরণার মাঝে',
  },
  {
    id: 16,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '53',
    sura: 'তারা পরিধান করবে পাতলা ও পুরু রেশমী কাপড়, আর বসবে মুখোমুখী হয়ে।',
  },
  {
    id: 17,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '54',
    sura: 'এ রকমই হবে, আর তাদের বিয়ে দিয়ে দেব ডাগর ডাগর সুন্দর উজ্জ্বল চোখওয়ালা কুমারীদের (হুরদের) সাথে।',
  },
  {
    id: 18,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '55',
    sura: 'তারা সেখানে শান্ত মনে বিভিন্ন ফল-মূল আনতে বলবে।',
  },
  {
    id: 19,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '56',
    sura: 'তারা সেখানে মৃত্যু আস্বাদন করবে না, প্রথম মৃত্যু ব্যতীত এবং আপনার পালনকর্তা তাদেরকে জাহান্নামের আযাব থেকে রক্ষা করবেন।',
  },
  {
    id: 20,
    suraNo: '44',
    suraName: 'ad-Dukhan',
    ayatNo: '57',
    sura: 'আপনার পালনকর্তার কৃপায় এটাই মহা সাফল্য।',
  },
];

const Home = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="container bg-dark ">
      <PageTitle title="Home Page" />
      <Carousel>
        <Carousel.Item>
          <img src={img1} className="d-block w-100" alt="Slider Picture" />
          <Carousel.Caption>
            <h5 className="text-info">
              لآ اِلَهَ اِلّا اللّهُ مُحَمَّدٌ رَسُوُل اللّهِ
            </h5>
            <p>
              এই পার্থিব জীবণ খেল-তামাশা ব্যতীত কিছুই নয় ! সুরা-আনকাবুত (৬৪)
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} className="d-block w-100" alt="Slider Picture" />
          <Carousel.Caption>
            <h5>পার্থিব জীবণ ধোকার উপকরণ ব্যতীত কিছুই নয় !</h5>
            <p className="text-light">
              জাহান্নামকে প্রবৃত্তি এবং জান্নাত কস্ট দ্বারা পরিবেস্টন করা হয়েছে
              ! (বুখারী-মুসলিম (২৮২২))
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} className="d-block w-100" alt="Slider Picture" />
          <Carousel.Caption>
            <h5>পরকালের সুখ হচ্ছে প্রকৃত সুখ !</h5>
            <p>
              .দুনিয়াতে এমন ভাবে জীবণ-যাপন করো যেন তুমি একজন অপরিচিত মুসাফির
              অথবা পথোচারী আর সর্বদা নিজেকে কবরবাসী মনে করো !!! মিশকাত-(৫২৭৪)
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="bg-secondary text-center p-1 border text-info fw-bolder">
        <h2>Sura Ad-Dukhan 38-57</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Ayat 38-57"
        />
      </div>
      <div className="bg-dark text-light">
        {data
          .filter((sura) => {
            return search === '' ? sura : sura.ayatNo.includes(search);
          })
          .map((sura) => {
            return (
              <div className="border p-2" key={sura.id}>
                <h2>{sura.sura}</h2>
                <p>আয়াত-{sura.ayatNo}</p>
              </div>
            );
          })}
      </div>
      <div className="">
        <div>
          <div className=" bg-dark text-light text-center border  p-1">
            <p>Starting Date:</p>
            <p>20/09/2025 English</p>
            <p>05/06/1432 Bangla</p>
            <p>26/03/1447 Arabic</p>
            <p>Saturday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
