import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PageTitle from '../pageTitle/pageTitle';

const foodData = [
  {
    id: 1,
    time: 'Saturday',
    breakfast: 'Rice + Vorta Item',
    lunch: 'Rice + Fish Curry + Dal + Salad',
    snacks: '3 Date + 1/2 Cucumber',
    dinner: 'Rice + Vegetables ',
  },
  {
    id: 2,
    time: 'Sunday',
    breakfast: 'Rice + Any Vorta Items ',
    lunch: 'Rice + Egg Curry + Salad',
    snacks: '3 Date + 3 Amond',
    dinner: 'Rice + 100ml Milk',
  },
  {
    id: 3,
    time: 'Monday',
    breakfast: '2 Boil Egg + 7 Nos Date ',
    lunch: 'Rice + Chicken + Salad',
    snacks: '3 Date + Tea',
    dinner: 'Rice + Kalojira Vorta/Any Curry ',
  },
  {
    id: 4,
    time: 'Tuesday',
    breakfast: 'Rice + Vegetables + Dal',
    lunch: 'Rice + Fish Curry + Salad',
    snacks: '3 Date + 3 Almond',
    dinner: 'Rice + Any Curry',
  },
  {
    id: 5,
    time: 'Wednesday',
    breakfast: 'Roti + Vegetable',
    lunch: 'Rice + Chicken + Salad',
    snacks: '3 Date + Coffee',
    dinner: 'Rice + Vegetables',
  },
  {
    id: 6,
    time: 'Thursday',
    breakfast: 'Rice + Dal + Vegetables',
    lunch: 'Rice + Egg Curry + Salad',
    snacks: '3 Date + 3 Almond',
    dinner: 'Roti + 100ml Milk',
  },
  {
    id: 7,
    time: 'Friday',
    breakfast: 'Rice + Any Curry',
    lunch: 'Rice + Chicken/Beef Curry + Salad',
    snacks: '3 Date + 3 Amond + Any Fruits',
    dinner: 'Potato Fry/Half Boil Duck Egg',
  },
];

const FoodControl = () => {
  const [search, setSearch] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div style={{ height: '1050px' }} className="container bg-secondary ">
      <PageTitle title="Food Controls" />
      <div className="bg-dark text-light text-center  p-1">
        <h3 className="fw-bolder pt-4">Daily Food Controls</h3>
      </div>
      <div className="bg-dark">
        <Form.Select
          size="sm"
          className="bg-dark text-light d-inline-block m-1 "
          style={{ width: 'auto' }}
          onChange={handleChange}
        >
          <option value="">Select Time</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </Form.Select>
      </div>
      <Table responsive striped bordered hover variant="dark">
        <thead className="text-center">
          <tr>
            <th>Time</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Snacks</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {foodData
            .filter((foodItem) => {
              return search === '' ? foodItem : foodItem.time === search;
            })
            .map((food) => {
              const { id, time, breakfast, snacks, lunch, dinner } = food;
              return (
                <tr key={id}>
                  <td>{time}</td>
                  <td>{breakfast}</td>
                  <td>{lunch}</td>
                  <td>{snacks}</td>
                  <td>{dinner}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="">
        <h3 className="text-info p-1">
          Tips#: ১ জনের খাবার ২ জন, ২ জনের খাবার ৩ জন এর জন্য যথেষ্ট!
        </h3>
        <h3 className="text-info p-1">Tips#: দিনে ৩.৫ লিটার পানি পান করো!</h3>
      </div>
    </div>
  );
};

export default FoodControl;
