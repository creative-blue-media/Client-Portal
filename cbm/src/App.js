import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebar from './components/layout/sidebar/Sidebar'
import Header from './components/layout/navigation/header'
import Dashboard from './components/layout/sidebar/dashboard/Dashboard'
import Content from './components/layout/content/Content'

function onClick(e, item) {
  console.log(JSON.stringify(item, null, 2));

}
const items = [
  {
    name: "dashboard", label: "Dashboard", Icon: HomeIcon,
    items: [
      { name: "brief", label: "Brief", onClick },
      { name: "timeline", label: "Timeline", onClick },
      { name: "chat", label: "Chat", onClick }
    ]
  },
  {
    name: "projects",
    label: "Projects",
    Icon: ReceiptIcon
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "profile", label: "Profile" },
      { name: "files", label: "Files", onClick },
      "divider",
      {
        name: "billing",
        label: "Billing",
        Icon: NotificationsIcon,
      }
    ]
  }
];



function Projects() {
  return (<h1>Projects</h1>);
}

function Profile() {
  return (<h1>Profile</h1>);
}

function Files() {
  return (<h1>Files</h1>);
}

function Billing() {
  return (<h1>Billing</h1>);
}
function App(props) {
  let [route, changeRoute] = useState('dashboard');
  let Component;

  switch (route) {
    case 'dashboard':
      Component = <Dashboard />;
      break;
    case 'projects':
      Component = <Projects />;
      break;
    case 'profile':
      Component = <Profile />;
      break;
    case 'files':
      Component = <Files />;
      break;
    case 'billing':
      Component = <Billing />;
      break;
  }

  function updateRoute(e, item) {
    console.log("Changing Route", item);
    changeRoute(item.name)
  }
  return (
    <div className="App">

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Sidebar items={items} updateRoute={updateRoute} />
      <div className="custom-container">
        <Header {...props} />
        <Content component={Component} />

      </div>

    </div >
  );
}

export default App;
