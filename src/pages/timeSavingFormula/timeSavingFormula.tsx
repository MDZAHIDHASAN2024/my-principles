import PageTitle from '../pageTitle/pageTitle';

const timeData = [
  {
    id: 1,
    rule: ' যে কাজটি করবেন তা কি জরুরী বা গুরুত্বপূর্ণ?',
  },
  {
    id: 2,
    rule: ' কাজ শেষে যে ফলাফল আসবে তা কি উপকারি?',
  },
];

const tipsData = [
  {
    id: 1,
    tips: ' দিনের শুরুতে কাজের পরিকল্পনা ও লিস্ট তৈরি করুন ।',
  },
  {
    id: 2,
    tips: ' কিভাবে কাজ করলে সময় কম লাগে তা নিয়ে ভাবুন । ',
  },
  {
    id: 3,
    tips: ' যে কাজ গুরু উপকারে আসবে না তা পরিহার করুন ।',
  },
  {
    id: 4,
    tips: ' কোন কাজ গুলোতে সময় বেশি খরচ হচ্ছে তা খুজে বের করুন এবং সে অনুযায়ী পদক্ষেপ নিন ।',
  },
  {
    id: 5,
    tips: ' শারীরিক ও মানসিক স্বস্থের যত্ন নিন । ',
  },
];

const TimeSavingFormula = () => {
  return (
    <div className="container bg-dark">
      <PageTitle title="Time Saving Formula Page" />
      <h2 className="text-light">Time Reducing Formula: 2Q</h2>
      <div className="bg-secondary  p-3 text-info">
        {timeData.map((rule) => {
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

export default TimeSavingFormula;
