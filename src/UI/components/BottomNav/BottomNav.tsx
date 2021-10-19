import React, {useState} from 'react';
import {Link } from "react-router-dom";

import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person';

import "./BottomNav.scss";

const routes = [
    {
        label: "Maps",
        icon: MapIcon,
        to: "/"
    },
    {
        label: "Events",
        icon: FavoriteIcon,
        to: "/events"
    }, 
    {
        label: "Interests",
        icon: PhoneIcon,
        to: "/interests"
    },
    {
        label: "Groups",
        icon: PersonPinIcon,
        to: "/groups"
    },
    {
        label: "Profile",
        icon: PersonIcon,
        to: "/profile"
    }
];

const BottomNav = (props: any) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (newTabIndex: number) => {
        setTabIndex(newTabIndex);
    };

    const getStyle = (i: number) => tabIndex===i ? {color: "#EB3AA7"}:{}

    return (
        <div className="BottomNav">
            <ul className="TabList">
                {routes.map((route, i) => 
                    <li className="TabItem"  key={i} onClick={(e: any) => handleChange(i)}>
                        <Link className="TabLink" to={route.to} style={getStyle(i)}>
                            {<route.icon />}
                            <span>{route.label}</span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default BottomNav;