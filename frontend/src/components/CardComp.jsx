import { Link } from "react-router-dom"

const CardComp = ({title,Icon,className,link}) => {
  return (
    <Link to={link} className='px-3 py-2 dark:bg-gray-600 bg-gray-300 text-gray-700 dark:text-gray-100 flex items-center space-x-3 h-20 md:h-30 active:scale-95   rounded-md cursor-pointer '>
    {Icon && <Icon className={`${className} md:text-2xl text-xl `}/>}
      <h1 className='md:text-2xl text-xl font-bold'>{title}</h1>
    </Link>
  )
}

export default CardComp