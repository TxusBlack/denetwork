import "bootstrap/dist/css/bootstrap.css";

function LandingPage() {
  return (
    <div style={{ backgroundColor: "black" }} className="vh-100">
      <div style={{ backgroundColor: "black" }} className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="row">
          <div className="col">
            <div>
              <img src="/logo.jpeg" alt="Denetwork" />
            </div>
            <button type="button" class="btn btn-dark mx-auto d-block">Let's start!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
