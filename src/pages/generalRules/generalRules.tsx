import { useState } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const generalRules = [
  {
    id: 1,
    rule: 'দৈনিক কোরআন তিলাওয়াত করো !',
  },
  {
    id: 2,
    rule: 'সকাল সন্ধ্যা দোয়া পাঠ করো !',
  },
  {
    id: 3,
    rule: 'দিনে ১০০ বার তওবা করো !',
  },
  {
    id: 4,
    rule: 'রাতে ঘুমানোর পূর্বে দোয়া পাঠ করো !',
  },
  {
    id: 5,
    rule: 'বিপদে সুন্দর ধর্য ধারণ করো !',
  },
  {
    id: 6,
    rule: 'মাসে ১ বার হলেও শহরের অতি ব্যাস্ততম এলাকায় (অতি ব্যাস্ততম সময় ) গিয়ে একা দাঁড়িয়ে অথবা বসে দুনিয়া কিভাবে চলছে তা উপলদ্ধি করো !',
  },
  {
    id: 7,
    rule: 'রাগ করো না !',
  },
  {
    id: 8,
    rule: 'হিংসা করো না !',
  },
  {
    id: 9,
    rule: 'কৃপণতা করো না !',
  },
  {
    id: 10,
    rule: 'অপচয় করো না !',
  },
  {
    id: 11,
    rule: 'কারো সাথে খারাপ আচারণ করো না !',
  },
  {
    id: 12,
    rule: 'তারাহুরো করো না!',
  },
  {
    id: 13,
    rule: ' তার ১০ টার আগে ঘুমাও !',
  },
  {
    id: 14,
    rule: ' ৮ ঘন্টার বেশি ঘুমাও না !',
  },
  {
    id: 15,
    rule: ' প্রয়োজন এর অতিরিক্ত খাবার খেয়ো না !',
  },
  {
    id: 16,
    rule: ' প্রয়োজন ছাড়া টাকা খরচ করো না !',
  },
  {
    id: 17,
    rule: ' অস্বাস্থকর খাবার খেয়ো না !',
  },
  {
    id: 18,
    rule: ' কারো কিছু নিওনা এবং খেয়ো না !',
  },
  {
    id: 19,
    rule: 'জেনারেল রুল এর কিছু কিছু রুল বিশেষ প্রয়োজন অনুসারে করা যেতে পারে !',
  },
  {
    id: 20,
    rule: ' অতি আবেগি হয়ে কাজ করো না !',
  },
  {
    id: 21,
    rule: ' পকেটে টাকা থাকলে ভিক্ষুক কে ফিরিয়ে দিয়ো না !',
  },
  {
    id: 22,
    rule: ' কারো ক্ষতি করো না !',
  },
  {
    id: 23,
    rule: ' পর নিন্দা করো না !',
  },
];

const GeneralRules = () => {
  const [searchRule, setSearchRule] = useState<number | string>('');
  return (
    <div className="container bg-dark">
      <PageTitle title="General-Rule Page" />
      <div className="container mb-2">
        <input
          type="text"
          value={searchRule}
          onChange={(e) => setSearchRule(e.target.value)}
          placeholder="Search Rule"
        />
      </div>

      {generalRules
        .filter((rule) => {
          return searchRule === ''
            ? rule
            : rule.id.toString().includes(searchRule.toString());
        })
        .map((rule) => {
          return (
            <div
              key={rule.id}
              className="bg-secondary text-light m-2 mt-0 p-2 border border-danger border-2 "
            >
              <h3 className="bg-dark d-inline-block p-1">RuleNo : {rule.id}</h3>
              <h3>{rule.rule}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default GeneralRules;
