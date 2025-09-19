import PageTitle from '../pageTitle/pageTitle';
import './index.css';
const principles = [
  {
    id: 1,
    rule: 'হালাল রুজি উপার্জন ও ভক্ষণ করো !',
  },
  {
    id: 2,
    rule: 'পাঁচ ওয়াক্ত সালাত আদায় করো !',
  },
  {
    id: 3,
    rule: 'রামাজান মাসে ছিয়াম পালন করো !',
  },
  {
    id: 5,
    rule: 'মাসিক বেতন এর ২.৫% দান করো !',
  },
];
const Principles = () => {
  return (
    <div className="container bg-secondary my-rule p-2 ">
      <PageTitle title="Main Principle Page" />
      <div className="bg-warning p-2 text-light d-block text-center ">
        <h2 className="fw-bold">Principle of 4</h2>
      </div>
      {principles.map((principle) => {
        return (
          <div
            className="text-light bg-danger text-center border   "
            key={principle.id}
          >
            <h2 className="bg-secondary  d-inline-block p-1 mt-1 mb-3 ms-0 border">
              Principle: {principle.id}
            </h2>
            <h2 className="mb-4">{principle.rule}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Principles;
