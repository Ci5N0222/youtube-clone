import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function RelatedVideos({ id, channelId }) {
    const youtube = useYoutubeApi();
    const { isLoading, error, data: videos } = useQuery({
        queryKey: ['related', channelId],
        queryFn: async () => youtube.otherList(channelId),
        staleTime: 1000 * 600
    });
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong</p>}
            {videos && (
                <ul>
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} type='list'/>
                    ))}
                </ul>
            )}
        </>
    );
}