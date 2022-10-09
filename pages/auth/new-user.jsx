import "bootstrap/dist/css/bootstrap.css";

const NewUserPage = () => {
  return (
    <div
      style={{ backgroundColor: "black", color: "white" }}
      className="vh-100"
    >
      <div className="container h-100 pt-3">
        <h3 className="text-center pb-4">Selecciona el tipo de perfil</h3>
        <div className="row">
          <div className="col justify-content-center d-flex">
            <div class="card" style={{"width": "50%", color: "black"}}>
              <img
                src="https://www.freeiconspng.com/thumbs/recruitment-icon/recruitment-icon-2.png"
                class="card-img-top p-5"
                alt="Recruiter"
              />
              <div class="card-body">
                <p class="card-text text-center">
                  Publicar proyectos o buscar talentos para contratar
                </p>
              </div>
            </div>
          </div>
          <div className="col justify-content-center d-flex">
            <div class="card" style={{"width": "50%", color: "black"}}>
              <img
                src="https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-laptop-icon-png-image_1871597.jpg"
                class="card-img-top"
                alt="Freelancer"
              />
              <div class="card-body">
                <p class="card-text text-center">
                  Buscar empleos o proyectos
                </p>
              </div>
            </div>
          </div>
          {/* <p>Puedes escoger ambos</p> */}
        </div>
      </div>
    </div>
  );
};

export default NewUserPage;
