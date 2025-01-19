export function Button({ buttonText,onClick }) {
  return (
    <div>
      <button
        type="button"
        className="mt-[0.5rem] w-[300px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
