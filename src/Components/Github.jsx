import { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import "./Github.css";
import Button from "react-bootstrap/Button";
import Trending from "./Trending";
import { FaGithub, FaSearch } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import Form from "react-bootstrap/Form";

function Github() {
  //managing the input value
  const [user, setUser] = useState("");

  //managing the fetch data
  const [data, setData] = useState([]);
  //  const [page,setPage] = useState(1)

  const [disabled, setDisabled] = useState(true);

  //Loading funtionality
  const [loading, setLoading] = useState(false);
  //  Handle submit button and auto disabled funcitonality
  // const current = new Date();
  // const date = `${current.getDate()}-${
  //   current.getMonth() + 1
  // }-${current.getFullYear()}`;

  //clock and time
  const timestampLower = getCustomFullDateAndTimeWithAmPm();
  //Handling OnChange
  const onchangeHandle = (e) => {
    // console.log(e.target.value);
    setUser(e.target.value);
    if (e.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onSubmitHandle = (e) => {
    fetch(
      `https://api.github.com/search/users?q=${user}&page=1&per_page=6&order="asc"`
    )
      .then((res) => {
        return res.json();
      })
      .then((value) => {
        console.log("data-", value.items);
        setData(value.items);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 id="title_github_main">
        Github Search App <FaGithub />{" "}
      </h1>
      {/* <h2>Current date is {date} </h2> */}
      <h2>  {timestampLower}</h2>
      <div>{/* <Spinner animation="border" /> */}</div>

      <div className="input_box">
        <div>
          <Form.Control
            size="lg"
            id="input_search"
            type="text"
            placeholder="Name here"
            onChange={onchangeHandle}
          />
        </div>
        <div>
          <Button
            type="submit"
            onClick={onSubmitHandle}
            disabled={disabled}
            variant="dark"
          >
            Dark
          </Button>
        </div>
      </div>

      <hr />
      <div className="Github_cards">
        <Trending />
        {loading ? (
          <DisplayCard data={data} key={data} />
        ) : (
          <div>
            <h2>
              Search and Find User <FaSearch />{" "}
            </h2>
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </>
  );
}
export default Github;