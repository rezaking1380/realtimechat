import React from "react";

function UsersCard({ avatarUrl, name, latestMessage, time, type, status }) {
  console.log(time);
  return (
    <>
      <div class="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative md:w-[250px]">
        <div class="w-16 h-16 relative flex flex-shrink-0">
          <img
            class="shadow-md rounded-full w-full h-full object-cover"
            src={avatarUrl}
            alt={name}
            width={64}
            height={64}
          />
          {status === "online" && (
            <div className="absolute bg-green-600 w-3 h-3 border bottom-0 right-0 rounded-full"></div>
          )}
        </div>
        {type == "chat" && (
          <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
            <p>{name}</p>
            <div class="flex justify-between items-center text-sm text-gray-600">
              <div class="min-w-0">
                <p class="truncate">{latestMessage}</p>
              </div>
              <p class="ml-2 whitespace-no-wrap">Just now</p>
            </div>
          </div>
        )}
        {type == "user" && (
          <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
            <p>{name}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersCard;
