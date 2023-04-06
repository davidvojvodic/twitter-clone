import Sidebar from "./layout/Sidebar"; // Importing the Sidebar component
import FollowBar from "./layout/FollowBar"; // Importing the FollowBar component

interface LayoutProps {
  children: React.ReactNode; // Defining the children prop as a React node
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Defining the Layout component as a functional component that takes in the children prop
  return (
    <div className="h-screen bg-black">
      {/* // Creating a div with a black background that takes up the entire screen height */}
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        {/* // Creating a container div that centers its content and has a max width of 6xl */}
        <div className="grid grid-cols-4 h-full">
          {/* // Creating a grid with 4 columns that takes up the entire height of its parent */}
          <Sidebar />
          {/* // Rendering the Sidebar component in the first column */}

          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
            {/* // Rendering the children prop in the second and third columns, with a border on the right side */}
          </div>
          <FollowBar />
          {/* // Rendering the FollowBar component in the fourth column */}
        </div>
      </div>
    </div>
  );
};

export default Layout; // Exporting the Layout component as the default export
