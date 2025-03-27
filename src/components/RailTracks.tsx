import { RailDetails } from "../constants/RailDetails";
import RailTrack from "./RailTrack";

const RailTracks = () => {
  return (
    <div
      id="railTrackWrapper"
      className="railTrackContainer w-screen h-screen flex flex-col py-9 gap-9 items-center bg-white"
    >
      {RailDetails.map((rail, i) => (
        <RailTrack
          key={i}
          imgs={rail.images}
          text={rail.title}
          index={rail.id}
        />
      ))}
    </div>
  );
};

export default RailTracks;
