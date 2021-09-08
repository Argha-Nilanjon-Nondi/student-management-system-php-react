import React, {Fragment, useEffect } from "react";
import LoadingBar from "./LoadingBar";
import { useHistory} from "react-router-dom";

export default function Logout() {
    let history=useHistory();
  useEffect(() => {
    localStorage.clear();
    history.push("/login/")
  });
  return (
    <Fragment>
      <LoadingBar className="mt-4" style={{ margin: "0 auto" }}></LoadingBar>
    </Fragment>
  );
}
