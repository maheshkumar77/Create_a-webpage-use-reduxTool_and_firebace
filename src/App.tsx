import Counter from "./component/Counter";
import RichTextEditor from "./textEditer/RichTextEditor";
import UserComponent from "./userCompnent";


const App = () => {
  return (
   <div className=" h-auto w-full flex justify-center items-center">
    <div className=" flex justify-between gap-x-px h-[50vh]">
    <Counter/>
    {/* <RichTextEditor/> */}
    <UserComponent/>
    </div>
   </div>
  );
};

export default App;
