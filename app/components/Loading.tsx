export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center"style={{ height: "100dvh" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading movies...</p>
        </div>
      </div>
    </>
  );
}
