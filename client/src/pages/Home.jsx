import { useState } from "react";
import DateTime from "react-datetime-picker";
import "./Home.css";
import Card from "../components/Card";
import { remainderAdd } from "../api/api";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/reminderSlice";

const Home = () => {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState();
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()

  const addReminder = async () => {
    if(!remindAt || !reminderMsg){
       return alert('Choose time or Add the Message')
    }
    await remainderAdd(remindAt, reminderMsg);
    setSuccess(true)
    dispatch(setLoading())
    notify()
    setReminderMsg('')
    setRemindAt()
  };
  const notify = () => {
    toast("Added Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="App">
        {success && (
        <div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </div>
      )}
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind Me </h1>
          <input
            type="text"
            placeholder="Reminder notes here.."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />
          <div className="react-datetime-picker">
            <DateTime
              value={remindAt}
              onChange={setRemindAt}
              minDate={new Date()}
              minutePlaceholder="mm"
              hourPlaceholder="hh"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
            />
          </div>
          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>
        <div className="homepage_body">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
