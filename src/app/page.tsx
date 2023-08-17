import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="container text-center">
          <img className="w-100" src="/images/start-page-user-with-todo.png" alt="/images/start-page-user-with-todo.png" style={{maxWidth: "20rem"}} />
          <h3 className="mt-4 fw-bold">Get Things Done with TODO!</h3>
          <p className="mt-4">Lörem ipsum dobårade mav, barade men trest, käpelig medan keplalogi. Aling stödkorv, fådissa </p>
          <Link href={"/sign-in"}><button className="btn custom-btn-1 w-100 py-3 mt-5">Get Started</button></Link>
      </div>
    </main>
  )
}