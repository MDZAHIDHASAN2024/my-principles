// my css

import myAudio from '../../assets/audio/my-heart.mp3';
import './index.css';
import PageTitle from '../pageTitle/pageTitle';

import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { Carousel } from 'react-bootstrap';

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
  const navigate = useNavigate();
  return (
    <div className="container bg-dark ">
      <PageTitle title="Home" />
      <div className="container">
        <img
          className="img-fluid"
          width="1370px"
          src="data:image/jpeg;base64,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"
          alt="Progile Image"
        />
      </div>
      <div>
        <div className="my-bg2 text-center">
          <button
            onClick={() => {
              navigate('/jahannam');
            }}
            className=" btn bg-danger text-light    ms-5"
          >
            জাহান্নাম দেখতে ক্লিক করুন
          </button>
          <button
            onClick={() => {
              navigate('/jannat');
            }}
            className=" btn bg-primary text-light me-5"
          >
            জান্নাত দেখতে ক্লিক করুন
          </button>
        </div>
        <h1 className=" my-bg1 p-2 text-center">
          এই পার্থিব জীবণ খেল-তামাশা ব্যতীত কিছুই নয় ! সুরা-আনকাবুত (৬৪)
        </h1>
        <h1 className=" my-bg1 p-2 text-center">
          জাহান্নামকে প্রবৃত্তি এবং জান্নাত কস্ট দ্বারা পরিবেস্টন করা হয়েছে !
          (বুখারী-মুসলিম ২৮২২)
        </h1>
        <h1 className=" my-bg1 p-2 text-center">
          দুনিয়াতে এমন ভাবে জীবণ-যাপন করো যেন তুমি একজন অপরিচিত মুসাফির অথবা
          পথোচারী আর সর্বদা নিজেকে কবরবাসী মনে করো !!! মিশকাত-(৫২৭৪)
        </h1>
      </div>

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
            if (search === '') return true;
            return sura.ayatNo === search;
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
              {toggle ? 'Click to Hide' : 'Click to Show Effective Date'}
            </button>
            {toggle && (
              <div className=" bg-dark text-light text-center  p-1">
                <p>24/10/2025 English</p>
                <p>8/07/1432 Bangla</p>
                <p>1/05/1447 Arabic</p>
                <p>Friday</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
