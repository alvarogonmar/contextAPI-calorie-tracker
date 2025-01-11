import { useEffect, useMemo } from "react";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { useActivity } from "./hooks/useActivity";

function App() {
  const { state, dispatch } = useActivity();

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length > 0, [state.activities]);
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase ">
            Calorie Tracker
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase
           text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Restart App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList />
      </section>

      <footer className="bg-lime-500 py-5 text-center">
        <p className="text-sm mb-3">Made by: Alvaro Gonzalez</p>
        <div className="flex justify-center gap-5">
          <a
            href="https://github.com/alvarogonmar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </a>

          <a
            href="https://linkedin.com/in/alvarogonmar0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
