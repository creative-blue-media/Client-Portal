import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";



function SidebarItem({ item, depthStep = 10, toggle, depth = 0, ...rest }) {

    const [collapsed, setCollapsed] = React.useState(true);
    const { label, items, Icon, onClick: onClickProp } = item;

    function toggleCollapse() {
        setCollapsed(prevValue => !prevValue);
    }

    function onClick(e) {
        if (Array.isArray(items)) {
            toggleCollapse();
        }
        if (onClickProp) {
            onClickProp(e, item);
        }
    }

    let expandIcon;
    if (Array.isArray(items) && items.length) {
        expandIcon = !collapsed ? (
            <ExpandLessIcon
                className={
                    "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
                }
            />
        ) : (
                <ExpandMoreIcon className="sidebar-item-expand-arrow" />
            );
    }
    return (
        <>
            <ListItem button dense {...rest} onClick={onClick}>
                <div
                    style={{ paddingLeft: depth * depthStep }}
                    className="sidebar-item-content"
                >
                    {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
                    <div className="sidebar-item-text">{label}</div>
                </div>
                {expandIcon}
            </ListItem>
            <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                {Array.isArray(items) ? (
                    <List disablePadding dense>
                        {items.map((subItem, index) => (
                            <React.Fragment key={`${subItem.name}${index}`}>
                                {subItem === "divider" ? (
                                    <Divider style={{ margin: "6px 0" }} />
                                ) : (
                                        <SidebarItem
                                            depth={depth + 1}
                                            depthStep={depthStep}
                                            item={subItem}
                                        />
                                    )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
        </>
    )
}

export default SidebarItem;