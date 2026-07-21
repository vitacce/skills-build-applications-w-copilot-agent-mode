import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Train smarter with a modern fitness platform</h1>
              <p className="lead text-muted mb-4">
                Track workouts, manage teams, and keep your progress visible in one place.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-success-subtle text-success">React 19</span>
                <span className="badge bg-info-subtle text-info">Express + TypeScript</span>
                <span className="badge bg-warning-subtle text-warning">MongoDB + Mongoose</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
