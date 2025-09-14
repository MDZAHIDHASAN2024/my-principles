import PageTitle from '../pageTitle/pageTitle';

const tourData = [
  {
    id: 1,
    rule: ' আপনি যেখানে যাবেন সেখানে যাওয়াটা কি খুব জরুরী?',
  },
  {
    id: 2,
    rule: ' আপনি না গিয়ে বিকল্প আছে কি?',
  },
  {
    id: 3,
    rule: ' আপনি যেখানে যাবেন সেখানের রাস্তা এবং জায়গা সম্পর্ক এ ধারণা আছে কি?',
  },
  {
    id: 4,
    rule: ' রোড ম্যাপ করেছেন তো?',
  },
];

const tipsData = [
  {
    id: 1,
    tips: 'যাতায়াতের আগে আপনার গন্তব্য সম্পর্ক এ স্পষ্ট ধারণা রাখুন । এবং সেখানে পৌছানোর জন্য কোন পথটি সব থেকে ভালো এবং সুবিধাজনক তা ঠিক করুন ।',
  },
  {
    id: 2,
    tips: 'যাতায়াতের জন্য একটি নিদিষ্ট বাজেট তৈরি করুন ',
  },
  {
    id: 3,
    tips: 'গনপরিবহন ব্যাবহার করুন । কাছাকাছির গন্তব্যের জন্য হেটেই যান ।',
  },
  {
    id: 4,
    tips: 'আপনার যদি অতি দূত কোন গন্তব্যে পৌছানোর প্রয়োজন  হয় তাহলে আপনার বিষয়বস্তু অনু্যায়ী বিকল্প ব্যাবস্থা গ্রুহণ করুন ।',
  },
  {
    id: 5,
    tips: 'লোকাল বাসে উঠলে ভাড়া যথা সম্ভব  পরে দেওয়ার চেস্টা করুন । বেশি জ্যাম দেখেলে তা কি জন্য লাগছে তা জানার চেষ্টা করুন  এবং যদি সম্ভব হয় রাস্তা টুকু পার হয়ে অন্য গাড়িতে যান । ',
  },
];

const TourPlanFormula = () => {
  return (
    <div className="container bg-dark">
      <PageTitle title="Tour Plan Formula Page" />
      <h2 className="text-light">Tour Plan Formula: 4Q</h2>
      <div className="bg-secondary  p-3 text-info">
        {tourData.map((rule) => {
          return (
            <div className="p-3 border" key={rule.id}>
              <h3 className="bg-warning d-inline-block text-danger border rounded p-1">
                Q: {rule.id}
              </h3>
              <h3>{rule.rule}</h3>
            </div>
          );
        })}
      </div>
      <div className="bg-info">
        {tipsData.map((tip) => {
          return (
            <div
              className="p-2 bg-info text-light border-bottom border-2"
              key={tip.id}
            >
              {
                <p>
                  <h5 className="bg-secondary d-inline-block text-info p-1 me-1">
                    Tips No: {tip.id}
                  </h5>
                  {tip.tips}
                </p>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourPlanFormula;
