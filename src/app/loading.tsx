export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white opacity-75">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
}
