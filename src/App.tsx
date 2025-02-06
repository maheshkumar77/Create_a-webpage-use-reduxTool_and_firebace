import Counter from "./component/Counter";
import RichTextEditor from "./textEditer/RichTextEditor";
import UserComponent from "./userCompnent";
import './App.css'

const App = () => {
  return (
   <div className=" h-auto w-full flex justify-center items-center">
    <div className="onediv">
    <Counter/>
    <RichTextEditor/>
    </div>
   
    <UserComponent/>
    
    
   </div>
  );
};

export default App;
