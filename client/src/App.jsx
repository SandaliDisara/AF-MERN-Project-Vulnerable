// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import PropTypes from 'prop-types';

import AnimalBlog from "./Components/AnimalBlog/AnimalBlog";
import AllBlogsStaff from "./Components/AnimalBlog/AllBlogsStaff";
import UpdateBlog from "./Components/AnimalBlog/UpdateBlog";

import CusViewBeef from "./Components/CustomerAP/CusViewBeef";
import SingleBeefDetails from "./Components/CustomerAP/BeefDetails"
import CusViewChicken from "./Components/CustomerAP/CusViewChicken";
import SingleChickenDetails from "./Components/CustomerAP/ChickenDetails";

import Animal from "./Components/AnimalProduction/Animal";
import Beef from "./Components/AnimalProduction/Beef";
import ViewBeef from "./Components/AnimalProduction/ViewBeef";
import BeefDetails from "./Components/AnimalProduction/BeefDetails";
import UpdateBeef from "./Components/AnimalProduction/UpdateBeef";
import Chicken from "./Components/AnimalProduction/Chicken";
import ChickenDetails from "./Components/AnimalProduction/ChickenDetails";
import ViewChicken from "./Components/AnimalProduction/ViewChicken";
import UpdateChicken from "./Components/AnimalProduction/UpdateChicken";
import Test from "./Components/AnimalProduction/Test";
import Milk from "./Components/AnimalProduction/Milk";
import Egg from "./Components/AnimalProduction/Egg";
import Pork from "./Components/AnimalProduction/Pork";
import GoatMilk from "./Components/AnimalProduction/GoatMilk";
import Goat from "./Components/AnimalProduction/Goat";
import APNavbar from "./Components/AnimalProduction/APNavbar";
import Footer from "./Components/Footer";
import AdminFooter from "./Components/AdminFooter";

import LandingPageGrassroot from "./Components/LandingPageGrassroot";
import LandingPageStaff from "./Components/LandinPageStaff";
import NavLandingStaff from "./Components/NavLandingStaff";

import AgriSections from "./Components/AgriSections";
import AnimalSections from "./Components/AnimalSections";

import SelectionPage from "./Components/SelectionPage";
import AnimalDataTable from "./Components/AnimalDataTable";
import AgriDataTable from "./Components/AgriDataTable";
import AnimalGrassNavbar from "./Components/AnimalGrassNavbar";
import AgriGrassNavbar from "./Components/AgriBlog/AgriGrassNavbar";
import AnimalServices from "./Components/AnimalServices";
import SelectionPageStaff from "./Components/SelectionPageStaff";
import AnimalStaffNavbar from "./Components/AnimalBlog/AnimalStaffNavbar";
import AgriStaffNavbar from "./Components/AgriBlog/AgriStaffNavbar";
import ImageGridAgri from "./Components/AgriBlog/ImageGridAgri";
import AgriBlogForm from "./Components/AgriBlog/AgriBlogForm";
import AgriBlog from "./Components/AgriBlog/AgriBlog";
import UpdateAgriBlog from "./Components/AgriBlog/UpdateAgriBlog";
import ImageGridAgriUser from "./Components/AgriBlog/ImageGridAgriUser";
import NavLandingGrass from "./Components/NavLandingGrass";
import AgriUserNav from "./Components/AgriBlog/AgriUserNav";
import AnimalUserNav from "./Components/AnimalBlog/AnimalUserNav";
import AllAnimalBlogs from "./Components/AnimalBlog/AllAnimalBlogs";
import AnimalBlogForm from "./Components/AnimalBlog/AnimalBlogForm";

import Login from "./Components/Login";
import LoginNav from "./Components/LoginNav";
import Home from "./Components/Home";
import AboutUs from "./Components/AboutUs";
import HomeNavbar from "./Components/HomeNavBar";
import HomeWhiteNavbar from "./Components/HomeWhiteNavBar";
import AdminNavi1 from "./Components/AdminNavi1";

import GrassAdminSelect from "./Components/GrassAdminSelect";
import AnimalSectionAdmin from "./Components/AnimalSectionAdmin";
import AgriAdminSelector from "./Components/AgriAdminSelector";
// function PrivateRoute({ path, element }) {
//   const hasLoggedIn = sessionStorage.getItem('hasLoggedIn') === 'true';

//   return hasLoggedIn ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/" replace />
//   );

 
// }

// PrivateRoute.propTypes = {
//   path: PropTypes.string.isRequired,
//   element: PropTypes.element.isRequired
// }

import ViewRice from "./Components/AgricultureProduction/ViewRice";
import AddRice from "./Components/AgricultureProduction/AddRice";
import RiceDetails from "./Components/AgricultureProduction/RiceDetails";
import ViewVegi from "./Components/AgricultureProduction/ViewVegi";
import VegiDetails from "./Components/AgricultureProduction/VegiDetails";
import AddVegi from "./Components/AgricultureProduction/AddVegi";
import UpdateVegi from "./Components/AgricultureProduction/UpdateVegi";
import UpdateRice from "./Components/AgricultureProduction/UpdateRice";
import ClientViewVegi from "./Components/AgricultureProduction/ClientViewVegi";
import ClientVegiDetails from "./Components/AgricultureProduction/ClientVegiDetails";
import ClientViewRice from "./Components/AgricultureProduction/ClientViewRice";
import ClientRiceDetails from "./Components/AgricultureProduction/ClientRiceDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<><Login/> <LoginNav /> <AdminFooter /></>}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/animal" element={<Animal />}></Route>
        <Route path="/landingStaff" element={<><NavLandingStaff /><LandingPageStaff /></>} />
        <Route path="/landingGrassroot" element={<><NavLandingGrass /><LandingPageGrassroot /></>} />
        <Route path="/selectionPage" element={<SelectionPage />} />
        <Route path="/AnimalDataTable" element={<><AnimalGrassNavbar /><AnimalDataTable /></>} />
        <Route path="/agriTable" element={<><AgriGrassNavbar /><AgriDataTable /></>} />
        <Route path="/animalServices" element={<><AnimalStaffNavbar /><AnimalServices /></>} />
        <Route path="/" element={<><HomeWhiteNavbar/><Home /><Footer /></>} />
        <Route path="/aboutus" element={<><HomeNavbar/><AboutUs /><Footer /></>} />
        <Route path="/landingStaff" element={<><NavLandingStaff /><LandingPageStaff /></>} />
        <Route path="/landingGrassroot" element={<><NavLandingGrass /><LandingPageGrassroot /></>} />
        <Route path="/selectionPage" element={<SelectionPage />} />
        <Route path="/AnimalDataTable" element={<><AnimalGrassNavbar /><AnimalDataTable /></>} />
        <Route path="/agriTable" element={<><AgriGrassNavbar /><AgriDataTable /></>} />
        <Route path="/animalServices" element={<><AnimalStaffNavbar /><AnimalServices /></>} />
        <Route path="/selectionStaff" element={<SelectionPageStaff />} />
        <Route path="/agriForm" element={<><AgriBlogForm /><Footer /></>} />
        <Route path="/agriServices" element={<><AgriStaffNavbar /><ImageGridAgri /><SelectionPageStaff /><Footer /></>} />
        <Route path="/agriArticle" element={<><AgriBlog /><Footer /></>} />
        <Route path="/agriArticleEdit" element={<><UpdateAgriBlog /><Footer /></>} />
        <Route path="/agriUser" element={<><HomeNavbar/><ImageGridAgriUser /><SelectionPage /><Footer /></>} />
        <Route path="/addanimalblog" element={<><AnimalUserNav /><AnimalBlogForm /><SelectionPage /><Footer /></>} />
        <Route path="/allanimblogs" element={<><HomeNavbar/><AllAnimalBlogs /><SelectionPage /><Footer /></>} />
        <Route path="/animalArticle" element={<><HomeNavbar/><AnimalBlog /><Footer /></>} />
        <Route path="/allBlogStaff" element={<><AnimalStaffNavbar /><AllBlogsStaff /><SelectionPageStaff /><Footer /></>} />
        <Route path="/blogUpdate" element={<><UpdateBlog /><Footer /></>} />

        <Route path="/cusviewbeef" element={<><HomeNavbar/><CusViewBeef /><Footer /></>} />
        <Route path="/cusviewchicken" element={<><HomeNavbar/><CusViewChicken /><Footer /></>} />
        <Route path="/cusSinglechicken" element={<><HomeNavbar/><SingleChickenDetails /><Footer /></>} />
        <Route path="/cusSinglebeef" element={<><HomeNavbar/><SingleBeefDetails /><Footer /></>} />
        <Route path="/test" element={<Test />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/milk" element={<><Milk /><APNavbar /><AdminFooter /></>} />
        <Route path="/beef" element={<><Beef /><APNavbar /><AdminFooter /></>} />

        <Route path="/singlebeef" element={<BeefDetails />} />
        <Route path="/vbeef" element={<><ViewBeef /><APNavbar /><AdminFooter /></>} />
        <Route path="/upbeef" element={<><UpdateBeef /><APNavbar /><AdminFooter /></>} />
        <Route path="/egg" element={<><Egg /><APNavbar /><AdminFooter /></>} />
        <Route path="/pork" element={<><Pork /><APNavbar /><AdminFooter /></>} />
        <Route path="/chicken" element={<><Chicken /><APNavbar /><AdminFooter /></>} />
        <Route path="/singlechicken" element={<ChickenDetails />} />
        <Route path="/vchicken" element={<><ViewChicken /><APNavbar /><AdminFooter /></>} />
        <Route path="/upchicken" element={<><UpdateChicken /><APNavbar /><AdminFooter /></>} />
        <Route path="/goatmilk" element={<><GoatMilk /><APNavbar /><AdminFooter /></>} />
        <Route path="/goat" element={<><Goat /><APNavbar /><AdminFooter /></>} />

        {/*Edited by kuls */}
        <Route path="/vvegi" element={<><ViewVegi/> <APNavbar /> <AdminFooter /> </> }></Route>
        <Route path="/svegi" element={<><VegiDetails /><APNavbar /> <AdminFooter /> </>} />
        <Route path="/addvegi" element={<><AddVegi /><APNavbar /><AdminFooter /></>} />
        <Route path="/upvegi" element={<><UpdateVegi /><APNavbar /><AdminFooter /></>} />
        <Route path="/vrice" element={<><ViewRice/> <APNavbar /> <AdminFooter /> </> }></Route>
        <Route path="/addrice" element={<><AddRice /><APNavbar /><AdminFooter /></>} />
        <Route path="/srice" element={<><RiceDetails /><APNavbar /> <AdminFooter /> </>} />
        <Route path="/uprice" element={<><UpdateRice/> <APNavbar /> <AdminFooter /> </> }></Route>
        <Route path="/clientvegi" element={<><ClientViewVegi/> <HomeNavbar /> <Footer /> </> }></Route>
        <Route path="/clientsvegi" element={<><ClientVegiDetails /><HomeNavbar /> <Footer /> </>} />
        <Route path="/clientrice" element={<><ClientViewRice/> <HomeNavbar /> <Footer /> </> }></Route>
        <Route path="/clientsrice" element={<><ClientRiceDetails /><HomeNavbar /> <Footer /> </>} />

        <Route path="/animsection" element={<><APNavbar/><AgriSections /><AdminFooter /></>} />
        <Route path="/agrisection" element={<><APNavbar/><AnimalSections /><AdminFooter /></>} />
        <Route path="/adminselect" element={<><APNavbar/><AdminNavi1 /><AdminFooter /></>} />
       
        <Route path="/grasstypeselect" element={<><APNavbar/><GrassAdminSelect /><AdminFooter /></>} />
        <Route path="/sanimsection" element={<><APNavbar/><AnimalSectionAdmin /><AdminFooter /></>} />
        <Route path="/sagrisection" element={<><APNavbar/><AgriAdminSelector /><AdminFooter /></>} />
      </Routes>
    </Router>
  );
}
