import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";
import {Link } from "react-router-dom";

import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person';

import "./BottomNav.scss";
import { HistoryOutlined } from '@mui/icons-material';

const routes = [
    {
        id: 0,
        label: "Maps",
        icon: MapIcon,
        to: "/",
        keywords: [""]
    },
    {
        id: 1,
        label: "Events",
        icon: FavoriteIcon,
        to: "/events",
        keywords: ["events", "event"]
    }, 
    {
        id: 2,
        label: "Interests",
        icon: PhoneIcon,
        to: "/interests",
        keywords: ["interests", "interest"]
    },
    {
        id: 3,
        label: "Groups",
        icon: PersonPinIcon,
        to: "/groups",
        keywords: ["groups", "group", "your-groups"]
    },
    {
        id: 4,
        label: "Profile",
        icon: PersonIcon,
        to: "/profile",
        keywords: ["profile"]
    }
];

const BottomNav = (props: any) => {
    const history = useHistory();
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (newTabIndex: number) => {
        setTabIndex(newTabIndex);
    };

    const getStyle = (i: number) => tabIndex===i ? {color: "#EB3AA7"}:{}

    useEffect(() => {
        let unlisten = history.listen((location, action) => {
            if(action === "PUSH") {
                const { pathname } = location;
                const filteredRoute = routes.filter((route: any) => {
                    let hasKeyword = route.keywords.filter((keyword: string) => pathname.includes(keyword))[0];
                    if(hasKeyword) {
                        return true;
                    }
                    return false;
                })[0];

                if(filteredRoute) {
                    handleChange(filteredRoute.id);
                }
            }
        })
        return () => {
            unlisten();
        }
    }, [])

    return (
        <div className="BottomNav">
            <ul className="TabList">
                {routes.map((route, i) => 
                    <li className="TabItem"  key={i} onClick={(e: any) => handleChange(route.id)}>
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