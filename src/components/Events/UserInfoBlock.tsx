import { Link } from "react-router-dom";
import moment from "moment/moment";

import { _arrayBufferToBase64 } from "../../utils/arrayBufferToBase64";
import { ImageUserType } from "../../types/EventTypes";
import { DataInfo, UserData } from "../../types/UserTypes";

type UserNameElLinkProps = {
  _id: string;
  u_id: string;
  ownerUser: string;
  data: DataInfo;
};
type UserInfoBlockProps = {
  uniqueImgUsers: ImageUserType | undefined;
  ownerUser: string | undefined;
  uniqueUsers: UserData[] | undefined;
  u_id: string;
  startDate: string | Date;
  endDate: string | Date;
};
type UserImgBlogProps = {
  className: string;
  img_200_200: any;
  user: string;
};
const UserImgBlog = ({
  className,
  img_200_200,
  user,
}: UserImgBlogProps) => (
  <div  className={className}>
    <img
      className="w-10 h-10 rounded-full overflow-hidden"
      src={`data:image/jpg;base64,${_arrayBufferToBase64(
        img_200_200.data.data
      )}`}
      alt={user}
    />
  </div>
);
const UserNameElLink = ({
  _id,
  u_id,
  ownerUser,
  data,
}: UserNameElLinkProps) => (
  <div>
    <Link to={u_id === ownerUser ? "/profile/" : `/profile/${_id}`}>
      <p className="font-bold">{data.userName + " " + data.userSurname}</p>
    </Link>
  </div>
);
const UserInfoBlock: React.FC<UserInfoBlockProps> = ({
  uniqueImgUsers,
  ownerUser,
  uniqueUsers,
  u_id,
  startDate,
  endDate,
}) => (
  <div className="w-full flex p-1">
    {uniqueImgUsers &&
      uniqueImgUsers.map(
        ({ user, img_200_200, _id }) =>
          user === ownerUser && (
            <UserImgBlog
            key={_id}
              className={"collapse sm:visible w-1/3 mt-2 md:mt-0  md:p-2 "}
              img_200_200={img_200_200}
              user={user}
            />
          )
      )}
    <div className="pl-2 pt-1 ">
      {uniqueUsers &&
        uniqueUsers.map(
          ({ _id, data }) =>
            _id === ownerUser && (
              <UserNameElLink
                key={_id}
                _id={_id}
                u_id={u_id}
                ownerUser={ownerUser}
                data={data}
              />
            )
        )}
      <p className="collapse sm:visible  text-xs">
        {"Начало" +
          " " +
          moment.utc(startDate).format("DD/MM/YYYY") +
          "-" +
          moment.utc(endDate).format("DD/MM/YYYY")}
      </p>
    </div>
  </div>
);

export { UserInfoBlock };
