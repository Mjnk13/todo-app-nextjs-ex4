import Link from 'next/link'
import { getDictionary } from './dictionaries'

export default async function Home({params}: {params: any}) {
  const lang = await getDictionary(params.lang);
  
  return (
    <main>
      <div className="container text-center">
          <img className="w-100" src="/images/start-page-user-with-todo.png" alt="/images/start-page-user-with-todo.png" style={{maxWidth: "20rem"}} />
          <h3 className="mt-4 fw-bold">{lang.getStarted.title}</h3>
          <p className="mt-4">Lörem ipsum dobårade mav, barade men trest, käpelig medan keplalogi. Aling stödkorv, fådissa </p>
          <Link href={`/${lang.name}/sign-in`}><button className="btn custom-btn-1 w-100 py-3 mt-5">{lang.getStarted.button}</button></Link>
      </div>
    </main>
  )
}