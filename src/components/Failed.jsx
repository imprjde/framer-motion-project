import React, { useEffect } from "react";
import "./Failed.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  showActiveTaskDescThree,
  markAsCompletedFromFailed,
} from "../features/SliceOne";

const Failed = () => {
  const failedChallenges = useSelector(
    (state) => state.challenges.failedChallenges
  );

  useEffect(() => {}, [failedChallenges]);
  const dispatch = useDispatch();

  const handleShowDesThree = (index) => {
    dispatch(showActiveTaskDescThree(index));
  };
  const markAsCompleted = (index) => {
    dispatch(markAsCompletedFromFailed(index));
  };
  return (
    <motion.div layout>
      {" "}
      {failedChallenges &&
        failedChallenges.map((challenge, index) => (
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
                <span className="btn2" onClick={() => markAsCompleted(index)}>
                  Marked as Completed
                </span>
              </div>
            </div>

            <div className="detail" onClick={() => handleShowDesThree(index)}>
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
              </AnimatePresence>{" "}
            </div>
          </motion.div>
        ))}
      {failedChallenges.length === 0 && (
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

export default Failed;
