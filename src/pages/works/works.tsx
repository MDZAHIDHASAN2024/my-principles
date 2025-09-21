import { Table } from 'react-bootstrap';

const Works = () => {
  return (
    <div
      style={{ height: '1000px' }}
      className="container bg-secondary text-center fw-bold p-2"
    >
      <div className="bg-dark text-light text-center  p-1">
        <h3 className="fw-bolder">Daily Home Working List</h3>
      </div>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Form Time</th>
            <th>To Time</th>
            <th>Work Name</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4:00AM</td>
            <td>5:00AM</td>
            <td>Salat, Quran, Islamic Book Read</td>
            <td></td>
          </tr>
          <tr>
            <td>5:00AM</td>
            <td>6:00AM</td>
            <td>Excercise, English Speaking Practice</td>
            <td></td>
          </tr>
          <tr>
            <td>6:00AM</td>
            <td>7:00AM</td>
            <td>WebDevelopment Practice</td>
            <td></td>
          </tr>
          <tr>
            <td>7:00AM</td>
            <td>8:00AM</td>
            <td>Breakfast, Ready for Office & Go</td>
            <td></td>
          </tr>
          <tr>
            <td>8:00AM</td>
            <td>8:00PM</td>
            <td>Office Works, Salat</td>
            <td></td>
          </tr>
          <tr>
            <td>8:00PM</td>
            <td>9:00PM</td>
            <td>Salat, Dinner</td>
            <td></td>
          </tr>
          <tr>
            <td>9:00PM</td>
            <td>10:00PM</td>
            <td>Family Time, All Work Review</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Works;
