import React from 'react';
import "./SearchInput.scss";

import SearchIcon from '@mui/icons-material/Search';
import MicrophoneIcon from '@mui/icons-material/MicRounded';

const SearchInput = (props: any) => {
    return (
        <div className="SearchInput">
            <div className="inner-flex">
                <div className="icon-container">
                    <SearchIcon />
                </div>
                <input autoComplete="nope" type="text" name="search" onChange={props.onChange}/>
                <div className="icon-container">
                    <MicrophoneIcon />
                </div>
            </div>
        </div>
    );
};

export default SearchInput;