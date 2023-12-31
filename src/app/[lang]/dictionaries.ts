import 'server-only'
 
const dictionaries = {
  en: () => import('../_dictionaries/en.json').then((module) => module.default),
  vi: () => import('../_dictionaries/vi.json').then((module) => module.default),
} as any
 
export const getDictionary = async (locale:string) =>  {
    return dictionaries[locale]();
}