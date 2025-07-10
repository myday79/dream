import { Box, Container, Heading, SimpleGrid, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Head>
        <title>꿈해몽 & 사주풀이 플랫폼</title>
        <meta name="description" content="AI 기반 꿈해몽과 실시간 사주풀이 상담 서비스" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box bg={bgColor} minH="100vh" py={20}>
        <Container maxW="container.xl">
          <Heading textAlign="center" mb={10} size="2xl">
            당신의 꿈과 운명을 해석해드립니다
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box
              bg={cardBgColor}
              p={8}
              borderRadius="lg"
              boxShadow="xl"
              textAlign="center"
            >
              <Heading size="xl" mb={6}>AI 꿈해몽</Heading>
              <Text fontSize="lg" mb={6}>
                최신 AI 기술로 분석하는 맞춤형 꿈해몽 서비스를 경험해보세요.
                음성으로 꿈 내용을 기록하고, 개인화된 해석을 받아보세요.
              </Text>
              <Link href="/dream-analysis" passHref>
                <Button colorScheme="purple" size="lg">
                  꿈 분석하기
                </Button>
              </Link>
            </Box>

            <Box
              bg={cardBgColor}
              p={8}
              borderRadius="lg"
              boxShadow="xl"
              textAlign="center"
            >
              <Heading size="xl" mb={6}>실시간 사주상담</Heading>
              <Text fontSize="lg" mb={6}>
                전문 사주풀이사와 실시간 화상 상담으로 더욱 정확한 운세를
                확인하세요. AI 초기 분석과 함께 심층적인 상담을 제공합니다.
              </Text>
              <Link href="/saju-reading" passHref>
                <Button colorScheme="teal" size="lg">
                  상담 시작하기
                </Button>
              </Link>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Home;