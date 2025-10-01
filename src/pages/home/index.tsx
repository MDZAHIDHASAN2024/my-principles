// my css
import img1 from '../../assets/images/slider01.jpg';
import img2 from '../../assets/images/slider02.jpg';
import img3 from '../../assets/images/slider03.jpg';
import myAudio from '../../assets/audio/my-heart.mp3';
import './index.css';
import PageTitle from '../pageTitle/pageTitle';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';

const data = [
  {
    id: 1,
    ayatNo: '40',
    sura: ' إِنَّ يَوْمَ الْفَصْلِ مِيقَاتُهُمْ أَجْمَعِينَ  নিশ্চয় ফয়সালার দিন তাদের সবারই নির্ধারিত সময়।',
  },
  {
    id: 2,
    ayatNo: '41',
    sura: ' يَوْمَ لَا يُغْنِي مَوْلًى عَن مَّوْلًى شَيْئًا وَلَا هُمْ يُنصَرُونَ যেদিন কোন বন্ধুই কোন বন্ধুর উপকারে আসবে না এবং তারা সাহায্যপ্রাপ্তও হবে না।',
  },
  {
    id: 3,
    ayatNo: '42',
    sura: ' إِلَّا مَن رَّحِمَ اللَّهُ ۚ إِنَّهُ هُوَ الْعَزِيزُ الرَّحِيمُ তবে আল্লাহ যার প্রতি দয়া করেন, তার কথা ভিন্ন। নিশ্চয় তিনি পরাক্রমশালী দয়াময়।',
  },
  {
    id: 4,
    ayatNo: '43',
    sura: ' إِنَّ شَجَرَتَ الزَّقُّومِ নিশ্চয় যাক্কুম বৃক্ষ',
  },
  {
    id: 5,
    ayatNo: '44',
    sura: ' طَعَامُ الْأَثِيمِ পাপীর খাদ্য হবে',
  },
  {
    id: 6,
    ayatNo: '45',
    sura: ' كَالْمُهْلِ يَغْلِي فِي الْبُطُونِ গলিত তাম্রের মত পেটে ফুটতে থাকবে।',
  },
  {
    id: 7,
    ayatNo: '46',
    sura: ' كَغَلْيِ الْحَمِيمِ যেমন ফুটে পানি।',
  },
  {
    id: 8,
    ayatNo: '47',
    sura: ' خُذُوهُ فَاعْتِلُوهُ إِلَىٰ سَوَاءِ الْجَحِيمِ একে ধর এবং টেনে নিয়ে যাও জাহান্নামের মধ্যস্থলে,',
  },
  {
    id: 9,
    ayatNo: '48',
    sura: ' ثُمَّ صُبُّوا فَوْقَ رَأْسِهِ مِنْ عَذَابِ الْحَمِيمِ অতঃপর তার মাথার উপর ফুটন্ত পানির আযাব ঢেলে দাও',
  },
  {
    id: 10,
    ayatNo: '49',
    sura: ' ذُقْ إِنَّكَ أَنتَ الْعَزِيزُ الْكَرِيمُ স্বাদ গ্রহণ কর, তুমি তো সম্মানিত, সম্ভ্রান্ত।',
  },
  {
    id: 11,
    ayatNo: '50',
    sura: ' إِنَّ هَـٰذَا مَا كُنتُم بِهِ تَمْتَرُونَ এ সম্পর্কে তোমরা সন্দেহে পতিত ছিলে।',
  },
  {
    id: 12,
    ayatNo: '51',
    sura: ' إِنَّ الْمُتَّقِينَ فِي مَقَامٍ أَمِينٍ নিশ্চয়ই মুত্তাকীরা থাকবে নিরাপদ স্থানে,',
  },
  {
    id: 13,
    ayatNo: '52',
    sura: ' فِي جَنَّاتٍ وَعُيُونٍ বাগান আর ঝরণার মাঝে',
  },
  {
    id: 14,
    ayatNo: '53',
    sura: ' يَلْبَسُونَ مِن سُندُسٍ وَإِسْتَبْرَقٍ مُّتَقَابِلِينَ তারা পরিধান করবে পাতলা ও পুরু রেশমী কাপড়, আর বসবে মুখোমুখী হয়ে।',
  },
  {
    id: 15,
    ayatNo: '54',
    sura: ' كَذَٰلِكَ وَزَوَّجْنَاهُم بِحُورٍ عِينٍ এ রকমই হবে, আর তাদের বিয়ে দিয়ে দেব ডাগর ডাগর সুন্দর উজ্জ্বল চোখওয়ালা কুমারীদের (হুরদের) সাথে।',
  },
  {
    id: 16,
    ayatNo: '55',
    sura: ' يَدْعُونَ فِيهَا بِكُلِّ فَاكِهَةٍ آمِنِينَ তারা সেখানে শান্ত মনে বিভিন্ন ফল-মূল আনতে বলবে।',
  },
  {
    id: 17,
    ayatNo: '56',
    sura: ' لَا يَذُوقُونَ فِيهَا الْمَوْتَ إِلَّا الْمَوْتَةَ الْأُولَىٰ ۖ وَوَقَاهُمْ عَذَابَ الْجَحِيمِ তারা সেখানে মৃত্যু আস্বাদন করবে না, প্রথম মৃত্যু ব্যতীত এবং আপনার পালনকর্তা তাদেরকে জাহান্নামের আযাব থেকে রক্ষা করবেন।',
  },
  {
    id: 18,
    ayatNo: '57',
    sura: ' فَضْلًا مِّن رَّبِّكَ ۚ ذَٰلِكَ هُوَ الْفَوْزُ الْعَظِيمُ আপনার পালনকর্তার কৃপায় এটাই মহা সাফল্য।',
  },
  {
    id: 19,
    ayatNo: '58',
    sura: ' فَإِنَّمَا يَسَّرْنَاهُ بِلِسَانِكَ لَعَلَّهُمْ يَتَذَكَّرُونَ আমি আপনার ভাষায় কোরআনকে সহজ করে দিয়েছি, যাতে তারা স্মরণ রাখে।',
  },
  {
    id: 20,
    ayatNo: '59',
    sura: ' فَارْتَقِبْ إِنَّهُم مُّرْتَقِبُونَ অতএব, আপনি অপেক্ষা করুন, তারাও অপেক্ষা করছে।',
  },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <div className="container bg-dark ">
      <PageTitle title="Home" />
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
              ! (বুখারী-মুসলিম ২৮২২)
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
        <h2>Sura Ad-Dukhan 44: 40-59</h2>
        <audio src={myAudio} controls /> <br />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Ayat 40-59"
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
          <div className="bg-dark text-center">
            <button
              className="btn btn-primary text-light mt-2"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? 'Hide' : 'Click to see Effective Date'}
              {toggle && (
                <div className=" bg-dark text-light text-center border  p-1">
                  <p>01/10/2025 English</p>
                  <p>16/06/1432 Bangla</p>
                  <p>8/04/1447 Arabic</p>
                  <p>Wednesday</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
