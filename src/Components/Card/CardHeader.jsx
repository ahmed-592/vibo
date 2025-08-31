
import userPhoto from '../../assets/149071.png'


export default function CardHeader({ image , userName , date}) {
  

  
  return <>
  
  
          <div className="flex">
            <img onError={(e)=>e.target.src = userPhoto} className="rounded-full w-10 h-10 mr-3" src= {image} />
            <div>    
              <h3 className="text-md font-semibold ">{userName}</h3>
              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </div>
    
       
  
  </>
}
