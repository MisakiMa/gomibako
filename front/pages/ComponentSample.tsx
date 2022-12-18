import { useEffect, useState } from "react"
import { atom, useRecoilState } from "recoil";

export const mainStationState = atom({
  key: 'mainStationState',
  default: 0
})

const fetchData = async () => {
  const res = await fetch("http://127.0.0.1:3500/");
  const data = await res.json()
  return data
} 
export default function ComponentSample() {
  const [count, setCount] = useState<number>(0)
  const [distance, setDistance] = useState<number>()

  const [mainStation, _] = useRecoilState(mainStationState)
  useEffect(() => {
      const log = async ()  => {
        switch(mainStation) {
          case 0:
            setCount(count => count + 1)
            const data = await fetchData()
            setDistance(data.distance)
            break
          case 1:
            setDistance(12)
            break
          case 2:
            setDistance(30)
          default:
            setDistance(15)
            break
        }
      }
      const time = setInterval(log, 500);

      return () => clearInterval(time);
  },[mainStation]);


  return (
    <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
      <div className="text-6xl font-bold mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
        {distance == null ? (<>距離が測れていません</>) : (<>距離: {distance}cm</>) }
        {(distance ?? 0) <= 21 ? ((distance ?? 0) <= 15 ?  ((distance ?? 0) <= 12 ? <>危険な状態です</> : <>多いです</>) :  <>普通です</>) :(<>少ないです</>) }
      </div>
    </div>
)
}