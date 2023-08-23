'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n-config'

const LanguageSwitcher = ({lang}: {lang: any}) => {
    const pathName = usePathname()
    const redirectedPathName = (locale: string) => {
        if (!pathName) 
            return '/';
        const segments = pathName.split('/');
        segments[1] = locale;
        return segments.join('/');
    }

    return (
        <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {lang.navbar.languageButton}
            </a>

            <ul className="dropdown-menu" style={{minWidth: "5rem"}}>
                {i18n.locales.map((locale) => {
                    return (
                        <li key={locale} className='text-center'>
                            <Link className="dropdown-item" href={redirectedPathName(locale)}>{locale}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
 
export default LanguageSwitcher;