import PageTitle from '../pageTitle/pageTitle';

const moneyData = [
  {
    id: 1,
    rule: ' যে জিনিস টি কিনবেন সে পরিমাণ টাকা আপনার কাছে আছে কি?',
  },
  {
    id: 2,
    rule: ' জিনিস টি সত্যিই প্রয়োজন কি?',
  },
  {
    id: 3,
    rule: ' জিনিস টির বিকল্প আছে কি?',
  },
  {
    id: 4,
    rule: ' প্রয়োজন অনুসারে জিনিস টি কিনুন!!!',
  },
];

const tipsData = [
  {
    id: 1,
    tips: 'বাজারের বিভিন্ন  স্থান পরিদর্শন  করুন । কোথায় কোন ধরনের পন্য পাওয়া যায় তা ভালো ভাবে জেনে নিন |',
  },
  {
    id: 2,
    tips: 'স্থানীয় বাজারের সময়সূচী জানুন । বাজারের কোন দিক কেমন ভির থাকে, কোন সময় ভালো পন্য পাওয়া যায় তা জানুন । ভির কম সময়ে কেনাকাটা করুন । বিক্রির শেষ সময় কিনুন ।',
  },
  {
    id: 3,
    tips: 'পণ্যের গড় দাম জানুন । বিভিন্ন দোকানে ঘুরে একই  পণ্যের গড় দাম জেনে নিন । পণ্যের উৎস, মান জিজ্ঞাসা করুন । অন-লাইন যাচাই করুন ।',
  },
  {
    id: 4,
    tips: 'দামদর করার সময় ধর্য ধরুন । প্রথম প্রস্তাব এ রাজি হবেন না ।',
  },
  {
    id: 5,
    tips: 'পন্য যাচাই করতে সময় নিন । গুনগত মান পরিক্ষা করুন । ',
  },
  {
    id: 6,
    tips: 'বাজার করার আগে লিস্ট তৈরি করুন ',
  },
];

const MoneySavingFormula = () => {
  return (
    <div className="container bg-dark">
      <PageTitle title="Money Saving Formula " />
      <h2 className="text-light">Money Saving Formula: 4Q</h2>
      <div className="bg-secondary  p-3 text-info">
        {moneyData.map((rule) => {
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
                <div>
                  <h5 className="bg-secondary d-inline-block text-info p-1 me-1">
                    Tips No: {tip.id}
                  </h5>
                  {tip.tips}
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoneySavingFormula;
