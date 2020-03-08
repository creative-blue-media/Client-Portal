import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebar from './components/layout/sidebar/Sidebar'

function onClick(e, item) {
  console.log(JSON.stringify(item, null, 2));
}

const items = [
  { name: "home", label: "Home", Icon: HomeIcon },
  {
    name: "billing",
    label: "Billing",
    Icon: ReceiptIcon,
    items: [
      { name: "statements", label: "Statements", onClick },
      { name: "reports", label: "Reports", onClick }
    ]
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "profile", label: "Profile" },
      { name: "insurance", label: "Insurance", onClick },
      "divider",
      {
        name: "notifications",
        label: "Notifications",
        Icon: NotificationsIcon,
        items: [
          { name: "email", label: "Email", onClick },
          {
            name: "desktop",
            label: "Desktop",
            Icon: DesktopWindowsIcon,
            items: [
              { name: "schedule", label: "Schedule" },
              { name: "frequency", label: "Frequency" }
            ]
          },
          { name: "sms", label: "SMS" }
        ]
      }
    ]
  }
];

function App() {
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

      <Sidebar items={items} />
      <div className="custom-container">
        <div class="collapse bg-dark" id="navbarHeader">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <h4 class="text-white">Creative Blue Media</h4>
                <p class="text-muted">Add some information about the album below, the author, or any other background
                  context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off
              to some social networking sites or contact information.</p>
                <div class="copyright">
                  <small>2019&nbsp;&copy;&nbsp; Creative Blue Media</small>
                </div>
              </div>
              <div class="col-sm-4 offset-md-1 py-4">
                <h4 class="text-white">Contact</h4>
                <ul class="list-unstyled">
                  <li><a href="#" class="text-white">Follow on Twitter</a></li>
                  <li><a href="#" class="text-white">Like on Facebook</a></li>
                  <li><a href="#" class="text-white">Email me</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar navbar-light bg-light shadow-sm">
          <div class="container d-flex justify-content-end">
            <button class="start-project-btn" type="button" data-toggle="" data-target="#"
              aria-controls="" aria-expanded="" aria-label="">
              <b>New Project</b>
            </button>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader"
              aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-arrow-down"></i>
            </button>

          </div>
        </div>
        <h1>Hello</h1>

      </div>

    </div >
  );
}

export default App;
