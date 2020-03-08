import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";

import SidebarItem from './SidebarItem';


function Sidebar({ items, depthStep, depth, expanded, ...rest }) {

    return (
        <div className="sidebar">
            <div>
                <a href="#"><img className="logo"
                    src="https://creativebluemediacontent.s3-us-west-1.amazonaws.com/Logo+Light.svg" /></a>
            </div>
            <List disablePadding dense>
                {items.map((sidebarItem, index) => (
                    <React.Fragment key={`${sidebarItem.name}${index}`}>
                        {sidebarItem === "divider" ? (
                            <Divider style={{ margin: "6px 0" }} />
                        ) : (
                                <SidebarItem
                                    depthStep={depthStep}
                                    depth={depth}
                                    expanded={expanded}
                                    item={sidebarItem}
                                    {...rest}
                                />
                            )}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
}


export default Sidebar; 