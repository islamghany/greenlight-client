import React, { useCallback, useState, useRef } from 'react';
import { ThumbUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useApi } from '@/hooks/useApi';
import api from '@/api';
import Spinner from '@/components/Spinner';

let timer: ReturnType<typeof setTimeout>;

interface MovieLikeProps {
  id: number;
}
const MovieLike: React.FC<MovieLikeProps> = ({ id }) => {
  const { data, isPending, isIdle, error } = useApi(
    (id) => api.likesApi.getMovieLikes(id).then((res) => res.data.likes),

    {
      onSuccess: (data) => {
        if (data) {
          let bisLiked = Boolean(data.isCurrentUserLiked);
          setIsLiked(bisLiked);
          currRef.current = bisLiked;
          prevRef.current = bisLiked;
          setLikesCount(data.likes!);
        }
      },
      enabled: true,
      enabledData: id,
    }
  );

  const { exec: addLike, isPending: addLikeIsPending } = useApi(
    (id) =>
      api.likesApi.likeMovie({ movie_id: id }).then((res) => res.data.messgae),
    {
      onSuccess: (data) => {
        prevRef.current = currRef.current;
        currRef.current = currRef.current;
      },
    }
  );
  const { exec: removeLike, isPending: removeLikeIsPending } = useApi(
    (id) => api.likesApi.unlikeMovie(id).then((res) => res.data.messgae),
    {
      onSuccess: (data) => {
        prevRef.current = currRef.current;
        currRef.current = currRef.current;
      },
    }
  );

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const prevRef = useRef<boolean>(false);
  const currRef = useRef<boolean>(false);
  const adjustCount = () => {
    currRef.current ? setLikesCount((e) => e - 1) : setLikesCount((e) => e + 1);
  };
  const handleClick = useCallback(() => {
    currRef.current = !currRef.current;

    setIsLiked((e) => {
      setLikesCount((t) => (e ? t - 1 : t + 1));
      return !e;
    });

    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (prevRef.current != currRef.current) {
        if (currRef.current) {
          addLike(id);
        } else {
          removeLike(id);
        }
      }
    }, 500);
  }, []);

  const classes = clsx('like-container', isLiked && 'like-container-active');

  if (isPending || isIdle) return <Spinner size="sm" />;
  if (data)
    return (
      <div className={classes} onClick={handleClick}>
        <ThumbUpIcon className="h-5 w-auto  text-gray-400" />
        <span className="text-sm text-gray-500">{likesCount}</span>
      </div>
    );

  return null;
};

export default MovieLike;
