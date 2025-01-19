import { Avatar } from "./Avatar";

export function Users() {
  return (
    <div className="m-[1rem] flex flex-col gap-[1rem]">
      <div className="font-bold text-xl">Users</div>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          className="border-[2px] rounded-md outline-none p-[0.5rem] w-[98vw]"
        />
      </div>
      <div className="flex justify-between mt-[1rem]">
        <div className="flex gap-[10px]">
          <Avatar initialLetter={"S"} />
          <div className="flex justify-center items-center font-bold text-xl">
            User 1
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
}
