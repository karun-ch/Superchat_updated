import { BrowserRouter,Route,Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignupPage"
import Chatbot_Interface from "./pages/Chatbot_Interface"
//import Payment_Card from "./Payment_interface/Payment_Card"


function App() {

  return (
    <>
   <BrowserRouter >
   <Routes>
   <Route path="/" element={<LandingPage/>} />
   <Route path="/signup" element={<SignupPage/>} />
   <Route path="/chatbot" element={<Chatbot_Interface/>} />
  {/* <Route path="/payment" element={<Payment_Card/>} /> */}
   </Routes>
   </BrowserRouter>

    </>
  )
}

export default App
