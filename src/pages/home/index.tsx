// my css
import img1 from '../../assets/images/slider01.jpg';
import img2 from '../../assets/images/slider02.jpg';
import img3 from '../../assets/images/slider03.jpg';
import './index.css';
import PageTitle from '../pageTitle/pageTitle';
import { Carousel } from 'react-bootstrap';
const Home = () => {
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
      <div className="">
        <div>
          <div className=" bg-dark text-light text-center border  p-1">
            <p>Starting Date:</p>
            <p>19/09/2025 English</p>
            <p>04/06/1432 Bangla</p>
            <p>25/03/1447 Arabic</p>
            <p>Friday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
