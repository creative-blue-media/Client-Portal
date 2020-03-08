
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



function Dashboard() {
    return (<Tabs>
        <TabList>
          <Tab>Brief</Tab>
          <Tab>Timeline</Tab>
          <Tab>Chat</Tab>
        </TabList>
     
        <TabPanel>
          <h2>Brief</h2>
        </TabPanel>
        <TabPanel>
          <h2>Timemline</h2>
        </TabPanel>
        <TabPanel>
          <h2>Chat</h2>
        </TabPanel>
      </Tabs>);
}

export default Dashboard;