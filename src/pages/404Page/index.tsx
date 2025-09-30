import { useNavigate } from 'react-router';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div style={{ height: '800px' }} className="text-center mt-5">
      <h1>404 Page Not found</h1>
      <button
        className="btn btn-danger mt-5"
        onClick={() => {
          navigate('/');
        }}
      >
        Back to Home Page
      </button>
    </div>
  );
};

export default Error;
