import {Card, Skeleton} from "@heroui/react";


export default function LoadingScreen() {
  return <>
    <Card className="w-full mx-auto space-y-5 mt-4 p-4" radius="lg">



    <div className="flex items-center space-x-3">
<Skeleton className="rounded-full w-10 h-10"></Skeleton>
    <div className="space-y-2">
      <Skeleton className="rounded-lg w-40 h-4"></Skeleton>
    <Skeleton className="rounded-lg w-50 h-2"></Skeleton>
    </div>
</div>
    
   



    <div className="space-y-3">
        
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        
      </div>

      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>


      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      
    </Card>
 
  </>
}


