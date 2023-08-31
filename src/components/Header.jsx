import React, { useState } from "react";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <AnimatePresence>
        {showModal && <Modal setShowModal={setShowModal} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={() => setShowModal(true)}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </div>
  );
};

export default Header;
