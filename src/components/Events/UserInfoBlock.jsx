import { Link } from "react-router-dom";
import moment from "moment/moment";

import { _arrayBufferToBase64 } from "../../utils/arrayBufferToBase64";

const UserInfoBlock = ({
  uniqueImgUsers,
  ownerUser,
  uniqueUsers,
  u_id,
  startDate,
  endDate,
}) => (
    <div className="w-full">
      <div className="w-full flex p-1">
        {uniqueImgUsers.map(
          ({ user, img_200_200, _id }) =>
            user === ownerUser && (
              <div key={_id} className="p-2 ">
                <img
                  className="w-10 h-10 rounded-full overflow-hidden"
                  src={`data:image/jpg;base64,${_arrayBufferToBase64(
                    img_200_200.data.data
                  )}`}
                  alt={user}
                />
              </div>
            )
        )}
        <div className="pl-2 pt-2 ">
          {uniqueUsers.map(
            ({ _id, data }) =>
              _id === ownerUser && (
                <div key={_id}>
                  <Link
                    to={u_id === ownerUser ? "/profile/" : `/profile/${_id}`}
                  >
                    <p className="font-bold">
                      {data.userName + " " + data.userSurname}
                    </p>
                  </Link>
                </div>
              )
          )}
          <p className="text-xs">
            {"Начало" +
              " " +
              moment.utc(startDate).format("DD/MM/YYYY") +
              "-" +
              moment.utc(endDate).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );

export { UserInfoBlock };
