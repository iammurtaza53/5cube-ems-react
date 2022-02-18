import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import LoginPage from 'pages/LoginPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from 'components/ProtectedRoute';


const EmployeePage = React.lazy(() => import('pages/EmployeePage'));
const AttendancePage = React.lazy(() => import('pages/AttendancePage'));
const LeavePage = React.lazy(() => import('pages/LeavePage'));
const PayrollPage = React.lazy(() => import('pages/PayrollPage'));
const BreakPage = React.lazy(() => import('pages/BreakPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <Switch>
          <LayoutRoute
            exact
            path="/login"
            layout={EmptyLayout}
            component={LoginPage}
          />

          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <ProtectedRoute exact path="/" component={EmployeePage} />
              <ProtectedRoute
                exact
                path="/employees"
                component={EmployeePage}
              />
              <ProtectedRoute
                exact
                path="/attendance"
                component={AttendancePage}
              />
              <ProtectedRoute exact path="/leave" component={LeavePage} />
              <ProtectedRoute exact path="/payroll" component={PayrollPage} />
              <ProtectedRoute exact path="/break" component={BreakPage} />
            </React.Suspense>
          </MainLayout>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
