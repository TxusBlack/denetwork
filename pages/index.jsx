import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();

  const goToAuth = () => {
    router.push(`/auth`);
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
              <img src="/logo.jpeg" alt="Denetwork" className="mx-auto d-block img-fluid" />
            </div>
            <h3 className="text-center text-white mb-4">Building decentralized and inclusive job opportunities<br/>for the creators of the future.</h3>
            <button type="button" class="btn btn-dark mx-auto d-block" onClick={() => goToAuth()}>
              Let's start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
