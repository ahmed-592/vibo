
export default function CardBody({image , body}) {
  return <>
  
    {body && <p className="">{body}</p>}
    {image && <img className="w-full h-90 object-cover rounded-md my-3" src={image} />}
  
  
  </>
}
