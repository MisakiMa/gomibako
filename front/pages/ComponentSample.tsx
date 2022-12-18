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
            setDistance(40)
            break
        }
      }
      const time = setInterval(log, 500);

      return () => clearInterval(time);
  },[mainStation]);


  return (
    <div className="mt-6 flex max-w-5xl flex-wrap items-center justify-around sm:w-full">
      <div className="text-6xl font-bold mt-6 w-auto rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
        {(distance ?? 0) <= 21 ? ((distance ?? 0) <= 15 ?  ((distance ?? 0) <= 12 ? <div className="text-rose-800">危険な状態です</div> : <div className="text-rose-400">多いです</div>) :  <div className="text-emerald-500">普通です</div>) :(<div className="text-emerald-500">少ないです</div>) }
      </div>
    </div>
)
}