import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxStateManagement/authslice";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { RiDeleteBin6Line,
  RiShareBoxLine
 } from "react-icons/ri";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import superchatLogo from "../assets/superchat_logo.png";
import { changesidebarwidth, changetodarkmode } from "../ReduxStateManagement/user";
import { clear_chat_api } from "../Utils/Apis";
import superchatLogo_white from "../assets/superchat_logo_white.png"






const Sidebar = () => {
  const { darkmode,sidebarReduced } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    dispatch(changesidebarwidth())

  };

  const menuItemClass = (sidebarReduced) =>
    `p-3 rounded-full flex items-center cursor-pointer ${
      sidebarReduced
        ? "justify-center  text-black"
        :` gap-2 hover:bg-gray-300 ${
            darkmode ? "hover:bg-gray-600 text-white" : "text-gray-600"
          }`
    }`;

  const tooltipClass = `absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded-md px-2 py-1 whitespace-nowrap`;
const handleclearconversations=async()=>{
  try {
  const resp=await fetch(clear_chat_api,{
    method:"DELETE",
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}` ,
      "Content-Type":"application/json" 
    }
  })
  const data=await resp.json()
  if(data.message)
  {
    localStorage.removeItem("messages")
    window.location.reload()
    
    alert("Conversations cleared successfully")

  }
  }catch(e){
    alert(e)
  }
}
  return (
    <div
      className={`  ${ 
        darkmode ? "bg-[#3A3B3C] text-white" : "bg-gray-100 text-gray-900"
      } h-screen flex flex-col  ${
        sidebarReduced ? "w-20" : "w-[230px]"
      } fixed top-0 left-0 z-10 `}
    >
       {/* Logo or Superchat LLC with Expand/Collapse Button */}
        <div className="flex items-center justify-between mt-20 px-2">
          {/* Logo (when collapsed) */}
            {sidebarReduced && (
              <div className="flex justify-center items-center">
                <img
                  src={darkmode ? superchatLogo_white : superchatLogo}
                  alt="Superchat Logo"
                  className="w-7 h-7"
                />
              </div>
  )}

  {/* Superchat LLC Text (when expanded) */}
  {!sidebarReduced && (
    <p
      className={`text-xl font-bold bg-gradient-to-r ml-4 ${
        darkmode
          ? "from-[#F5EEF8] to-[#D0D3D4]"
          : "from-[#6F036C] to-[#FF6F61E5]"
      } bg-clip-text text-transparent`}
    >
      Superchat LLC
    </p>
  )}

  {/* Expand/Collapse Button */}
  <div className="relative group ml-4">
  <div
    onClick={toggleSidebar}
    className={`flex items-center justify-center w-6 h-6 p-1 rounded-full cursor-pointer ${
      darkmode ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
    }`}
    style={{ fontSize: "0.75rem" }} // Optional: Adjust icon size directly
  >
    {sidebarReduced ? <FaArrowRight /> : <FaArrowLeft />}
  </div>


    {/* Tooltip for Expand/Collapse */}
  {/* <div
    className={`${tooltipClass} absolute top-1/2 transform -translate-y-1/2 ${
      sidebarReduced ? "left-4" : "right-10"
    } z-50`}
  >
    {sidebarReduced ? "Expand" : "Collapse"}
  </div> */}
  </div>
</div>
      
      {/* Menu Items */}
      <div className="flex flex-col items-start px-0 py-0 mt-auto mb-1 text-black-900 text-sm">
        {/* Settings */}
        
        <div className="h-10 relative text-sm group mb-0 text-black  w-full">
          <div className={menuItemClass(sidebarReduced)}>
          <IoSettingsOutline  className={`text-lg flex gap-2 items-center justify-center cursor-pointer  ${
              darkmode ? "text-white " : "text-black "
            }`} />
            {!sidebarReduced && <span className={`${darkmode ? "text-white" : "text-black"}`} >Settings</span>}
          </div>
          {sidebarReduced && <div className={tooltipClass}>Settings</div>}
        </div>

        {/* Dark Mode Toggle */}
        <div className="h-10 relative group  w-full">
          <div onClick={() =>{ 
            const isdarkmode=localStorage.getItem("darkmode")
            if(isdarkmode)
            {
              localStorage.removeItem("darkmode")
              dispatch(changetodarkmode(false))

            }else{
              localStorage.setItem("darkmode",true)
              dispatch(changetodarkmode(true))
            }
            
            }} className={menuItemClass(sidebarReduced)}>
            {darkmode ? <FaSun  className={`text-lg flex gap-2 items-center justify-center cursor-pointer  ${
              darkmode ? "text-white " : "text-gray-600 "
            }`}/> : <MdOutlineDarkMode className="text-lg " />}
            {!sidebarReduced && <span className={`${darkmode ? "text-white" : "text-black"}`} >{darkmode ? "Light Theme" : "Dark Theme"}</span>}
          </div>
          {sidebarReduced && (
            <div className={tooltipClass}>{darkmode ? "Light Theme" : "Dark Theme"}</div>
          )}
        </div>

        {/* Clear Conversations */}
        <div 
        className="h-10 relative group mb-0 w-full">
          <div className={menuItemClass(sidebarReduced)}>
          <RiDeleteBin6Line 
            className={`text-lg flex gap-2 items-center justify-center cursor-pointer  ${
              darkmode ? "text-white " : "text-black-600 "
            }`}
              onClick={handleclearconversations}
            />
            {!sidebarReduced && <span 
            className=" hover:text-gray-950 "
              onClick={handleclearconversations}

            >Clear Conversations</span>}
          </div>
          {sidebarReduced && <div
                  onClick={handleclearconversations}

          className={tooltipClass}>Clear Conversations</div>}
        </div>

        {/* Updates & FAQ */}
        <div className="h-10 relative group mb-2 w-full">
          <div className={menuItemClass(sidebarReduced)}> 
          <RiShareBoxLine  className={`text-lg flex gap-2 items-center justify-center cursor-pointer  ${
                darkmode ? "text-white " : "text-black-600 "
              }`} />
            {!sidebarReduced && <span>Updates & FAQ</span>}
          </div>
          {sidebarReduced && <div className={tooltipClass}>Updates & FAQ</div>}
        </div>

        {/* Logout */}
        <div className="h-10 relative group text-xs w-full ">
          {sidebarReduced ? (
            <div className="relative group ">
              <MdLogout 
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("messages")
                navigate("/signup");
              }}
                className={`text-lg cursor-pointer ml-8  ${
                  darkmode ? "text-white hover:text-red-800" : "text-black-600 hover:text-red-700"
                }`}
              />
              <div className={tooltipClass}>Logout</div>
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("messages")

                navigate("/signup");
              }}
              className={`text-sm flex gap-2 items-center justify-center cursor-pointer ml-3.5 ${
                darkmode ? "text-white hover:text-red-800" : "text-gray-600 hover:text-red-700"
              }`}            >
              <MdLogout className="text-lg text-black-900" />
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;