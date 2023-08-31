import React, { useState, useRef, useEffect } from "react";
import ImagesArray from "../assets/images";
import { motion, useAnimate, stagger } from "framer-motion";
import { useDispatch } from "react-redux";
import { addNewChallenge } from "../features/SliceOne";
import defaultImage from "../assets/images";
const Modal = ({ setShowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [image, setImage] = useState(defaultImage[0].src);
  const [scope, animate] = useAnimate();
  const dispatch = useDispatch();
  let showDes = false;
  const modalRef = useRef(null);

  let validate = title !== "" && description !== "" && deadline && image;
  const handleAddChallenge = (e) => {
    e.preventDefault();
    if (validate) {
      dispatch(
        addNewChallenge({ title, description, deadline, showDes, image })
      );
      setShowModal(false);
    }
    animate(
      "input, textarea",
      { x: [-10, 0, 10, 0] },
      { type: "spring", duration: 0.2, delay: stagger(0.07) }
    );
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="backdrop">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="modal"
      >
        <div className="nw">New Challenge</div>
        <form id="new-challenge" onSubmit={handleAddChallenge} ref={scope}>
          <p>
            <label htmlFor="title">Title</label>
            <input
              style={{
                border: "1px solid black",
                fontSize: "15px",
                fontWeight: "900",
              }}
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              style={{
                border: "1px solid black",
                fontSize: "15px",
                fontWeight: "900",
              }}
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="deadline">Deadline</label>
            <input
              style={{
                border: "1px solid black",
                fontSize: "15px",
                fontWeight: "900",
              }}
              type="date"
              name="deadline"
              id="deadline"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </p>

          <motion.ul
            id="new-challenge-images"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            animate="visible"
          >
            {ImagesArray.map((Images) => (
              <motion.li
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 },
                }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                className={Images.src === image ? "selected" : ""}
                key={Images.id}
                onClick={() => setImage(Images.src)}
              >
                <img src={Images.src} alt={Images.alt} />
              </motion.li>
            ))}
          </motion.ul>
          <p className="new-challenge-actions">
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit">Add Challenge</button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
