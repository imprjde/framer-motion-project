import React from "react";
import "./Completed.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  showActiveTaskDescTwo,
  markAsFailedFromCompleted,
} from "../features/SliceOne";

const Completed = () => {
  const completedChallenges = useSelector(
    (state) => state.challenges.completedChallenges
  );

  const dispatch = useDispatch();

  const handleShowDesTwo = (index) => {
    dispatch(showActiveTaskDescTwo(index));
  };

  const markAsFailed = (index) => {
    dispatch(markAsFailedFromCompleted(index));
  };
  return (
    <motion.div layout>
      {completedChallenges &&
        completedChallenges.map((challenge, index) => (
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
                  <span className="title"> {challenge.title}</span>
                  <span className="disc">
                    Complete until {challenge.deadline}
                  </span>
                </div>
              </div>

              <div className="btn_div">
                <span className="btn1" onClick={() => markAsFailed(index)}>
                  Marked as Failed
                </span>
              </div>
            </div>

            <div className="detail" onClick={() => handleShowDesTwo(index)}>
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
      {completedChallenges.length === 0 && (
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

export default Completed;
