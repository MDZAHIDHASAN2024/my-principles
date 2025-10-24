import profile from '../../assets/images/jahid.jpg';
import PageTitle from '../pageTitle/pageTitle';
const Intro = () => {
  return (
    <div className="container bg-secondary ">
      <PageTitle title="Intro" />
      <div className="bg-secondary ">
        <img
          style={{ width: '100px', display: 'block', margin: 'auto' }}
          src={profile}
          alt="profile"
        />
      </div>
      <div className="bg-secondary">
        <h2 className=" border rounded-pill d-block text-center text-info fw-bold mt-2">
          Introduction:
        </h2>

        <h5 className="bg-secondary text-light p-2">
          আমার নাম মোঃ জাহিদ হাসান পিতা মোঃ আনোয়ার হোসেন মাস্টার মাতা মোছাঃ
          জামিলা বেগম গ্রামঃ বেড়াগ্রাম, থানাঃ সাঘাটা, জেলাঃ গাইবান্ধা, বিভাগঃ
          রংপুর, বাংলাদেশ I আলহামদুলিল্লাহ আমি জন্ম সূত্রে একজন মুসলিম আমরা ৪
          ভাই ৩ বোন I আমার বাবা পেশায় একজন মাদ্রাসার শিক্ষক ছিলেন আমি জানি এবং
          দেখেছি তিনি অনেক ভালো মানষ ছিলেন ২২ সেপ্টেম্বর ২০১৫ সালে তিনি দুনিয়ার
          মায়া ত্যাগ করেন পরকালে চলে যান আল্লাহ যেন তাকে জান্নাত দান করেন আমিন I
          আমার মা ছিলেন গৃহিনী I আমাদের তেমন কোন জায়গা জমি ছিলো না যেটুকু ছিলো
          তা ২০১১ সালে নদী গর্ভ চলে যায় যাইহোক আমি ২০১৫ সালে এস, এস, সি, এবং
          ২০১৭ তে এইচ, এস, সি, পাশ করি 28/01/2019 সালে প্রাণ-আর, এফ, এল, গ্রুপ এ
          চাকরিতে যোগ দেই...
        </h5>
        <div className="bg-secondary border p-2 mt-5 text-light text-center">
          <h2>Name: MD. ZAHID HASAN</h2>
          <h2>Father Name: Md. Anwar Hossen</h2>
          <h2>Mother Name: Mst. Jamila Begum</h2>
          <h2>Vill: Beragram</h2>
          <h2>PS: Saghata</h2>
          <h2>Dist: Gaibandha</h2>
          <h2>Mobile: 01745 94 00 65</h2>
        </div>
      </div>
    </div>
  );
};

export default Intro;
