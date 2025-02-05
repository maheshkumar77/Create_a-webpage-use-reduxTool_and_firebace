
import { Provider } from 'react-redux';
import Store from './store/store'; // Import Redux store
import FormComponent from './userfrom/Userform'; // Import the form component
import DisplayData from './userfrom/Userdata'; // Import the display component

const UserComponent = () => {
  return (
    <Provider store={Store}>
      <div>
        <h1>User Form Submission</h1>
        <FormComponent />
        <DisplayData />
      </div>
    </Provider>
  );
};

export default UserComponent;
