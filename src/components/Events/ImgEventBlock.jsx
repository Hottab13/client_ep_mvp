import EventProfile from "../../assets/images/event_profile_200_200.jpg";
import { _arrayBufferToBase64 } from "../../utils/arrayBufferToBase64";

const ImgEventBlock = ({ ImgEvents, name, _id }) => (
  <>
    {ImgEvents.find((e) => _id === e.event) ? (
      ImgEvents.map(
        (e) =>
          _id === e.event && (
            <img
              key={e._id}
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={`data:image/jpg;base64,${_arrayBufferToBase64(
                e?.img_200_200.data.data
              )}`}
              alt={name}
            />
          )
      )
    ) : (
      <img
        className="lg:h-48 md:h-36 w-full object-cover object-center"
        src={EventProfile}
        alt="event_profil"
      />
    )}
  </>
);
export { ImgEventBlock };
