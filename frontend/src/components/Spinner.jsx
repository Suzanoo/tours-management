function Spinner() {
  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <div
          id="spinner"
          className=" hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
              border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
      ;
    </>
  );
}

export default Spinner;
