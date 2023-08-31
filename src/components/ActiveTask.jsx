import "./ActiveTask.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import {
  moveToFailed,
  moveToCompleted,
  showActiveTaskDesc,
} from "../features/SliceOne";
import { useDispatch, useSelector } from "react-redux";

const ActiveTask = () => {
  const dispatch = useDispatch();
  const activeChallenges = useSelector(
    (state) => state.challenges.activeChallenges
  );

  const handleMoveTofailed = (index) => {
    dispatch(moveToFailed(index));
  };
  const handleMoveToCompleted = (index) => {
    dispatch(moveToCompleted(index));
  };

  const handleShowDes = (index) => {
    dispatch(showActiveTaskDesc(index));
  };
  return (
    <motion.div layout exit={{ y: -30, opacity: 0 }}>
      <motion.div>
        {activeChallenges &&
          activeChallenges.map((challenge, index) => (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="act"
              key={index}
            >
              <div className="div_1">
                <div className="info">
                  <img src={challenge.image} alt="" className="img" />
                  <div className="div_2">
                    <span className="title">{challenge.title}</span>
                    <span className="disc">
                      Complete until {challenge.deadline}
                    </span>
                  </div>
                </div>

                <div className="btn_div">
                  <span
                    className="btn1"
                    onClick={() => handleMoveTofailed(index)}
                  >
                    Marked as Failed
                  </span>
                  <span
                    className="btn2"
                    onClick={() => handleMoveToCompleted(index)}
                  >
                    Marked as Completed
                  </span>
                </div>
              </div>

              <div className="detail" onClick={() => handleShowDes(index)}>
                <span className="view_details">
                  View Details{" "}
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate: challenge.showDes ? 180 : 0,
                      type: "smooth",
                    }}
                    className="icon"
                  >
                    <BiSolidUpArrow />
                  </motion.span>
                </span>
                <AnimatePresence>
                  {challenge.showDes && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="details"
                    >
                      {challenge.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
      </motion.div>
      {activeChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="act"
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="empty"
          >
            <span>No Challenges Found.</span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActiveTask;
