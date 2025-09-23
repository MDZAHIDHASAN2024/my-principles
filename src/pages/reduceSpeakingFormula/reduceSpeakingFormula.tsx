import PageTitle from '../pageTitle/pageTitle';

const speakData = [
  {
    id: 1,
    rule: ' আপনি যা বলতে চাচ্ছেন, তা কি সত্যি দরকারী?',
  },
  {
    id: 2,
    rule: ' এই কথা বললে কি অন্যদের উপকার হবে? বা আপনার প্রয়োজন মেটাবে?',
  },
  {
    id: 3,
    rule: ' ধীরগতিতে, প্রয়োজন বোধে, চিন্তা করে কথা বলুন !!!',
  },
];

const tipsData = [
  {
    id: 1,
    tips: 'সংক্ষেপে কথা বলার অভ্যাস গড়ে তুলুন । অল্প কথায় স্পষ্ট ভাবে বেশি কিছু বোঝানোর চেষ্টা করুন ।',
  },
  {
    id: 2,
    tips: 'সব জায়গায় কথা বলা জরুরী নয় । তাই নিরব থাকার অনুশীলন করুন । ',
  },
  {
    id: 3,
    tips: 'কেউ যখন কথা বলে তখন তাকে বাধা না দেওয়ার অনুশীলন করুন ।',
  },
  {
    id: 4,
    tips: 'নিজের কথা বিশ্লেষন করুন। দিনের শেষে ভাবুন আপনি কোথায় কোথায় অপ্রয়োজনীয় কথা বলেছেন ।',
  },
  {
    id: 5,
    tips: 'কিভাবে কম কথা বলা যায় তা নিয়ে ভবির্ষ্যতে যে অনুযায়ী কাজ করুন । ',
  },
  {
    id: 6,
    tips: 'কম কথা বলার অভ্যাস রাতারাতি তৈরি হবে না তাই ধৈর্য ধরে নিজের অভ্যাস পরিবর্তন করুন এবং ধীরে ধীরে উন্নতি লক্ষ্য করুন ।',
  },
];

const ReduceSpeakingFormula = () => {
  return (
    <div className="container bg-dark">
      <PageTitle title="Reduce Spaking Formula" />
      <h2 className="text-light">Reduce Speaking Formula: 3Q</h2>
      <div className="bg-secondary  p-3 text-info">
        {speakData.map((rule) => {
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

export default ReduceSpeakingFormula;
