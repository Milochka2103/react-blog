import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { useState } from "react";
import { NoMatch } from "./containers/NoMatch/NoMatch";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { BlogCard } from "./containers/BlogPage/components/BlogCard";
import { BlogCardPage } from "./containers/BlogPage/components/BlogCardPage";
import { useGetPosts } from "./shared/queries";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("userName") === "admin");

  const {data, isLoading, isError, error, isFetching } = useGetPosts();

  return (
    <Router>
      <div className="App">
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
        />

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (isLoggedIn) return <Redirect to="/blog" />;
                return <Redirect to="/login" />;
              }}
            />

            <PublicRoute isLoggedIn={isLoggedIn} path="/login" exact>
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
                setIsAdmin={setIsAdmin}
              />
            </PublicRoute>
            
            <PrivateRoute isLoggedIn={isLoggedIn} path="/blog/:postId" exact>
              <BlogCardPage isAdmin={ isAdmin}/>
            </PrivateRoute>
            

            <PrivateRoute isLoggedIn={isLoggedIn} path="/blog" exact>
              <BlogPage isAdmin={ isAdmin}/>
            </PrivateRoute>

            
            <Route exact path="/404">
              <NoMatch />
            </Route>

            <Route path="*"
              render={({location}) => {
                return <Redirect to={{
                  pathname:"/404",
                  from: location
                }} />
              }}
            />


          </Switch>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}