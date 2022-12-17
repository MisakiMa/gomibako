import { useEffect, useState } from "react"

const fetchData = async () => {
  const res = await fetch("http://127.0.0.1:3500/");
  const data = await res.json()
  return data
} 
export default function ComponentSample() {
  const [count, setCount] = useState<number>(0)
  const [distance, setDistance] = useState<number>()
  useEffect(() => {
      const log = async ()  => {
        setCount(count => count + 1)
        const data = await fetchData()
        setDistance(data.distance)
      }
      const time = setInterval(log, 500);

      return () => clearInterval(time);
  },[]);


  return (
    <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
      <div className="text-6xl font-bold mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
        {distance == null ? (<>距離が測れていません</>) : (<>距離: {distance}cm</>) }
      </div>
    </div>
)
}