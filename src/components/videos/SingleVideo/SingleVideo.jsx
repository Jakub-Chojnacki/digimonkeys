import React, { useContext, useState } from 'react';
import { Flex, Box, Heading, Image, Text, AspectRatio } from '@chakra-ui/react';

import useFetchVideo from '../../../hooks/useFetchVideo';
import VideoContext from '../../../context/video-context';
import VideoActionIcons from './VideoActionIcons';
import ModalPlayer from '../../UI/Modals/ModalPlayer'

const SingleVideo = ({ id, addedAt, isFav, isVimeo, isYt }) => {
  const { listView } = useContext(VideoContext);
  const [showModal, setShowModal] = useState(false);
  const { res } = useFetchVideo(id, isYt, isVimeo);

  let gotYoutubeData = res && isYt && res.items[0];
  let gotVimeoData = res && isVimeo;
  let displayVideoData;

  const getVideoDataTemplate = (url, title, views, likes, addedAt) => {
    return (
      <Flex direction={listView ? 'row' : 'column'} height="100%">
        <AspectRatio
          ratio={!listView ? 4 / 3 : 16 / 9}
          minW={['50%', '50%', '40%', '40%']}
        >
          <Image
            cursor="pointer"
            src={url}
            onClick={() => setShowModal(true)}
          />
        </AspectRatio>

        <Flex
          direction="column"
          justify="space-between"
          width="100%"
          height="100%"
          align="center"
        >
          <Box padding={2} fontSize={['12', '12', '14']} width="100%">
            <Heading
              size="sm"
              noOfLines={2}
              fontSize={
                listView ? ['16', '16', '18', '24'] : ['16', '16', '18', '18']
              }
              marginBottom={2}
            >
              {title}
            </Heading>
            {/* {views && <Text>{`Views: ${views}`}</Text>} */}
            <Text fontSize={listView && { xl: '20' }}>{`Likes: ${likes}`}</Text>
            <Text
              fontSize={listView && { xl: '20' }}
            >{`Added at : ${addedAt}`}</Text>
          </Box>
          <VideoActionIcons
            isFav={isFav}
            id={id}
            openVideoModal={() => setShowModal(true)}
          />
        </Flex>
      </Flex>
    );
  };

  if (gotYoutubeData) {
    const {
      snippet: {
        title,
        thumbnails: {
          high: { url },
        },
      },
      statistics: { viewCount: views, likeCount: likes },
    } = res.items[0];

    displayVideoData = getVideoDataTemplate(url, title, views, likes, addedAt);
  }

  if (gotVimeoData) {
    const {
      name: title,
      metadata: {
        connections: {
          likes: { total: likes },
        },
      },
      pictures: { sizes },
    } = res;
    displayVideoData = getVideoDataTemplate(
      sizes[3].link,
      title,
      null,
      likes,
      addedAt
    );
  }

  if (!gotYoutubeData && !gotVimeoData) {
    displayVideoData = getVideoDataTemplate(
      'https://via.placeholder.com/250',
      'Loading...',
      null,
      'unknown',
      'unknown'
    );
  }

  return (
    <Flex justify="space-between" marginBottom={4} width="100%">
      <Flex
        background="gray.100"
        p={4}
        borderRadius="8px"
        direction="column"
        justify="space-between"
        gap={2}
        width="100%"
      >
        {displayVideoData}
      </Flex>

      {showModal && (
        <ModalPlayer
          isYt={isYt}
          isVimeo={isVimeo}
          id={id}
          hideModal={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </Flex>
  );
};

export default SingleVideo;
