
import { Provider } from 'react-redux';
import Store from './store/store'; 
import FormComponent from './userfrom/Userform'; 
import DisplayData from './userfrom/Userdata'; 
import './usercomponent.css'
const UserComponent = () => {
  return (
    <Provider store={Store}>
      <div className='usercomp'>
        
        <FormComponent />
        <DisplayData />
      </div>
    </Provider>
  );
};

export default UserComponent;
