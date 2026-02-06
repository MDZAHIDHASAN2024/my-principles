import { Table } from 'react-bootstrap';
import PageTitle from '../pageTitle/pageTitle';

const Works = () => {
  return (
    <div
      style={{ height: '1000px' }}
      className="container bg-secondary text-center fw-bold p-2"
    >
      <PageTitle title="Work Plans" />
      <div className="bg-dark text-light text-center  p-1">
        <h3 className="fw-bolder">Daily Home Working List</h3>
      </div>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Work Name</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4:00AM</td>
            <td>5:00AM</td>
            <td>Salat, Quran, Drink A Glass of Water</td>
            <td>1</td>
          </tr>
          <tr>
            <td>5:00AM</td>
            <td>6:00AM</td>
            <td>Excercise</td>
            <td>1</td>
          </tr>
          <tr>
            <td>6:00AM</td>
            <td>7:00AM</td>
            <td>WebDevelopment Practice</td>
            <td>1</td>
          </tr>
          <tr>
            <td>7:00AM</td>
            <td>8:00AM</td>
            <td>Breakfast, Ready for Office & Go</td>
            <td>1</td>
          </tr>
          <tr>
            <td>8:00AM</td>
            <td>8:00PM</td>
            <td>Office Works, Salat</td>
            <td>12</td>
          </tr>
          <tr>
            <td>8:00PM</td>
            <td>9:00PM</td>
            <td>Salat, Dinner</td>
            <td>1</td>
          </tr>
          <tr>
            <td>9:00PM</td>
            <td>10:00PM</td>
            <td>Family Time, All Work Review</td>
            <td>1</td>
          </tr>
          <tr>
            <td>10:00PM</td>
            <td>4:00AM</td>
            <td>Sleep</td>
            <td>6</td>
          </tr>
        </tbody>
      </Table>
      <div className="div">
        <p>1. English 5 Word</p>
        <p>2. Linux 1 CMD,</p>
        <p>3. Other's knowledge Gather,</p>
        <p>4. LAD Meditation</p>
      </div>
    </div>
  );
};

export default Works;
