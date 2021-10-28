import React, {useState} from 'react';
import "./Interests.scss";

import SearchInput from '../../components/SearchInput/SearchInput';
import InterestsList from '../../components/InterestsList/InterestsList';

import { interests } from "../../../Data/Static/Interests";

const Interests = (props: any) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e: any) => {
        setSearch(e.target.value);
    }

    const getFilteredInterests = () => {
        return search !== ""
        ? interests.filter((interest: any) =>
            interest.name.toLowerCase().includes(search.toLowerCase())
          )
        : interests;
    }

    return (
        <div className="Interests">
            <SearchInput onChange={onChangeSearch} />

            <div className="InterestsContainer">
                <div className="-Inner">
                    <span className="inner-txt">Find interests</span>
                    <InterestsList interests={getFilteredInterests()}/>
                </div>
            </div>
        </div>
    );
};

export default Interests;