import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing/Landing";
import Search from "./pages/Search/Search";
import Detail from "./pages/Detail/Detail";
import Community from "./pages/Community/Community";
import WritingForm from "./pages/Community/WritingForm";
import CommunityDetail from "./pages/Community/Detail";
import Login from "./pages/Login/Login";
import My from "./pages/My/My";
import AuthProvider from "./components/login/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="">
        <Navbar />
        <Route path="/" exact component={Landing} />
        <Route path="/pages/login" exact component={Login} />
        <Route path="/pages/mountain/search" exact component={Search} />
        <Route path="/pages/mountain/search/:id" exact component={Detail} />
        <Route path="/pages/community" exact component={Community} />
        <Route path="/pages/community/new" exact component={WritingForm} />
        <Route path="/pages/community/update/:id" exact component={WritingForm} />
        <Route path="/pages/community/:id" component={CommunityDetail} />
        <Route path="/pages/my" component={My} />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
