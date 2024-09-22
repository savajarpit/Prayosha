import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/searchform.css"
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ms-3">
      {/* <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form> */}

<form onSubmit={handleSubmit} className="searchform">
  <input type="search" placeholder="Search here .." value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })} className="serchforminput" />
  <button type="submit" className="hellobtns">
  <i className="fa fa-search"  />
  </button>
 
</form>


    </div>
  );
};

export default SearchInput;
