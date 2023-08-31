import React, { useState } from "react";
import Tabs from "./Tabs";
import ActiveTask from "./ActiveTask";
import Completed from "./Completed";
import Failed from "./Failed";
import { useSelector } from "react-redux";

const AllChallenges = () => {
  const { activeChallenges, completedChallenges, failedChallenges } =
    useSelector((state) => state.challenges);
  const [tabSwitch, setTabSwitch] = useState(1);

  return (
    <div className="allchallenges">
      <Tabs
        setTabSwitch={setTabSwitch}
        activeChallenges={activeChallenges}
        failedChallenges={failedChallenges}
        completedChallenges={completedChallenges}
      />
      {tabSwitch === 1 && <ActiveTask />}
      {tabSwitch === 2 && <Completed />}
      {tabSwitch === 3 && <Failed />}
    </div>
  );
};

export default AllChallenges;
