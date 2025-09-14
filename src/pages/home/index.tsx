// my css

import './index.css';
import PageTitle from '../pageTitle/pageTitle';
const Home = () => {
  return (
    <div className="container bg-dark ">
      <PageTitle title="Home Page" />
      <div className="border">
        <div className="container-fluid bg-secondary">
          <div className="text-light my-bg1 p-2 d-block m-auto ">
            <h1 className="d-block text-center">
              {' '}
              لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ
            </h1>
          </div>
          <div className="my-bg1   p-2">
            <h1>১. এই পার্থিব জীবণ খেল-তামাশা ব্যতীত কিছুই নয় !</h1>
            <p>সুরা-আনকাবুত (৬৪)</p>
          </div>
          <div className="my-bg1  p-2">
            <h1>২.পার্থিব জীবণ ধোকার উপকরণ ব্যতীত কিছুই নয় !</h1>
            <p>সুরা-হাদিদ (২০)</p>
          </div>
          <div className="my-bg1  p-2">
            <h1>
              ৩.জাহান্নামকে প্রবৃত্তি এবং জান্নাত কস্ট দ্বারা পরিবেস্টন করা
              হয়েছে !
            </h1>
            <p>বুখারী-মুসলিম (২৮২২)</p>
          </div>
          <div className="my-bg1  p-2">
            <h1>৪.পরকালের সুখ হচ্ছে প্রকৃত সুখ !</h1>
            <p>বুখারী (২৯৬১)</p>
          </div>
          <div className="my-bg1  p-2">
            <h2>
              ৫.দুনিয়াতে এমন ভাবে জীবণ-যাপন করো যেন তুমি একজন অপরিচিত মুসাফির
              অথবা পথোচারী আর সর্বদা নিজেকে কবরবাসী মনে করো !!!
            </h2>
            <p>মিশকাত-(৫২৭৪)</p>
          </div>
          <div className=" bg-success text-light text-center border  p-2">
            <h2>Starting Date:</h2>
            <h2>15/09/2025 English</h2>
            <h2>31/05/1432 Bangla</h2>
            <h2>21/03/1447 Arabic</h2>
            <h2>Monday</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
