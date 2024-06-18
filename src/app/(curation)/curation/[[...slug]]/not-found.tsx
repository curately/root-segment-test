const Curation404 = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8">Oops</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Curation page not found</h1>
        <p className="mt-4 text-base sm:mt-6">Sorry, we couldn’t find the curation you’re looking for.</p>

        <div className="mt-10 flex justify-center">
          <a href="#" className="text-sm font-semibold leading-7">
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
        </div>
      </div>
    </>
  )
}

export default Curation404
