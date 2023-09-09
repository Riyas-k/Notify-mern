import { useEffect, useState } from "react";
import { deleteReminder, getRemindersAll } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reminderSlice";
import Swal from "sweetalert2";

const Card = () => {
  const [reminders, setReminders] = useState([]);
  const [success, setSuccess] = useState(false);
  const loading = useSelector((store) => store.reminder.loading);
  const dispatch = useDispatch();

  const getReminder = async () => {
    await getRemindersAll().then((res) => {
      setReminders(res);
      dispatch(setLoading());
    });
  };
  useEffect(() => {
    getReminder();
  }, []);
  const handleDelete = async (id) => {
    // Show a SweetAlert confirmation dialog
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this reminder.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If the user confirms, delete the reminder
    if (isConfirmed) {
      await deleteReminder(id);
      setSuccess(true);
      notify();
      getReminder();
    }
  };

  const notify = () => {
    toast("Deleted Successfully", {
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
  useEffect(() => {
    if (loading) {
      getReminder();
    }
  }, [loading]);
  return (
    <>
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
      {reminders?.map((remind) => (
        <div className="reminder_card" key={remind._id}>
          <h2>{remind.reminderMsg.slice(0, 10)}</h2>
          <h3>Remind Me at:</h3>
          <p>
            {String(
              new Date(remind.remindAt).toLocaleString(undefined, {
                timeZone: "Asia/Kolkata",
              })
            )}
          </p>
          <button className="button" onClick={() => handleDelete(remind._id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Card;
