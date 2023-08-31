import React, { useState } from "react";
import { TabArray } from "../constants/TabArray";
import { AnimatePresence, motion } from "framer-motion";
import "./Tabs.css";
const Tabs = ({
  setTabSwitch,
  activeChallenges,
  completedChallenges,
  failedChallenges,
}) => {
  const [id, setId] = useState(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, stiffness: 100, type: "spring" }}
      className="all_Tabs"
    >
      {TabArray.map((item) => (
        <div key={item.id}>
          <div
            className="each_Tab"
            onClick={() => {
              setId(item.id);
              setTabSwitch(item.id);
            }}
          >
            <span>
              {item.title}{" "}
              <motion.span className="item_len">
                {item.id === 1 && activeChallenges
                  ? activeChallenges.length
                  : item.id === 2 && completedChallenges
                  ? completedChallenges.length
                  : item.id === 3 && failedChallenges
                  ? failedChallenges.length
                  : 0}
              </motion.span>
            </span>
            <AnimatePresence>
              {item.id === id && (
                <motion.span
                  layoutId="Tab_Indicator"
                  className="active"
                ></motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Tabs;
