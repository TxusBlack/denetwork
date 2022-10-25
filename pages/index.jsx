import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   fetchRipio();
  // }, []);

  const goToAuth = () => {
    router.push(`/auth`);
  };

  const fetchRipio = async () => {
    let resp = () => {
      return new Promise(function (resolve, reject) {
        fetch("https://api.exchange.ripio.com/api/v1/rate/all/", {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          resolve(response);
        }).catch((error) => {
          console.log('error', error);
        });
      });
    };
    let responseData = await resp();
    console.log(responseData.data);
  };

  return (
    <div style={{ backgroundColor: "black" }} className="vh-100">
      <div
        style={{ backgroundColor: "black" }}
        className="container-fluid d-flex justify-content-center align-items-center h-100"
      >
        <div className="row">
          <div className="col">
            <div>
              <img
                src="/logo.jpeg"
                alt="Denetwork"
                className="mx-auto d-block img-fluid"
              />
            </div>
            <h3 className="text-center text-white mb-4">
              Building decentralized and inclusive job opportunities
              <br />
              for the creators of the future.
            </h3>
            <button
              type="button"
              class="btn btn-dark mx-auto d-block"
              onClick={() => goToAuth()}
            >
              Let's start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
