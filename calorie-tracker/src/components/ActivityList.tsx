import {
  PencilSquareIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useActivity } from "../hooks/useActivity";

export default function ActivityList() {
  const { state, dispatch, isEmptyActivities, categoryName } = useActivity();
  const { activities } = state;

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Foods and Exercises
      </h2>

      {isEmptyActivities ? (
        <p className="text-center p-4">No activities yet</p>
      ) : (
        activities.map((activity) => {
          const warningCalories =
            activity.calories >= 275 && activity.category === 1
              ? "text-red-500"
              : "text-lime-500";
          return (
            <div
              key={activity.id}
              className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
            >
              <div className="space-y-2 relative">
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
            ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}
                >
                  {categoryName(+activity.category)}
                </p>
                <p className="text-2xl font-bold pt-5">{activity.name}</p>
                <p
                  className={`font-black text-4xl text-lime-500 ${warningCalories}`}
                >
                  {activity.calories} {""}
                  <span>Calories</span>
                  {activity.calories >= 275 && activity.category === 1 && (
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 inline-block ml-2" />
                  )}
                </p>
              </div>

              <div className="flex gap-5 items-center">
                <button
                  onClick={() => {
                    dispatch({
                      type: "set-activeId",
                      payload: { id: activity.id },
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <PencilSquareIcon className="h-8 w-8 text-gray-800" />
                </button>

                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <XCircleIcon className="h-8 w-8 text-red-500" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
