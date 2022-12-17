import { stringify } from "querystring";
import React, { useEffect, useState } from "react";

export const CurrentImage: React.FC = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timer>();
  // 1秒毎にimgタグのsrcを更新することによってブラウザのキャッシュを使わずに画像をサーバーから再取得する
  const [imageSrc, setImageSrc] = useState<{
    imageSrc: string;
    imageHash: number;
  }>({
    imageSrc: "http://localhost:3500/images/image.png",
    imageHash: Date.now(),
  });

  useEffect(() => {
    if (!timerId) {
      setTimerId(
        setInterval(() => {
          setImageSrc({
            imageSrc: imageSrc.imageSrc,
            imageHash: Date.now(),
          });
        }, 2 * 1000)
      );
    }
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <img src={`${imageSrc.imageSrc}?${imageSrc.imageHash}`} />
    </div>
  );
};
