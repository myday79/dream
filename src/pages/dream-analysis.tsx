import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Textarea,
  Text,
  useToast,
  IconButton,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import Head from 'next/head';

const DreamAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const toast = useToast();
  const mediaRecorder = useRef(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks);
        // 여기에 음성을 텍스트로 변환하는 로직 추가 예정
        toast({
          title: '녹음이 완료되었습니다.',
          status: 'success',
          duration: 3000,
        });
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: '마이크 접근에 실패했습니다.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeDream = async () => {
    if (!dreamText.trim()) {
      toast({
        title: '꿈 내용을 입력해주세요.',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    try {
      // 여기에 AI 분석 API 호출 로직 추가 예정
      const mockAnalysis = '당신의 꿈은 새로운 시작과 변화를 암시합니다...';
      setAnalysis(mockAnalysis);
    } catch (error) {
      toast({
        title: '분석 중 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Head>
        <title>AI 꿈해몽 분석 - 꿈해몽 & 사주풀이 플랫폼</title>
        <meta name="description" content="AI가 분석하는 맞춤형 꿈해몽 서비스" />
      </Head>

      <Box bg={bgColor} minH="100vh" py={10}>
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Heading>AI 꿈해몽 분석</Heading>

            <Box
              w="100%"
              bg={cardBgColor}
              p={6}
              borderRadius="lg"
              boxShadow="md"
            >
              <VStack spacing={4}>
                <HStack w="100%" justifyContent="flex-end">
                  <IconButton
                    aria-label={isRecording ? '녹음 중지' : '녹음 시작'}
                    icon={isRecording ? <FaStop /> : <FaMicrophone />}
                    colorScheme={isRecording ? 'red' : 'blue'}
                    onClick={isRecording ? stopRecording : startRecording}
                  />
                </HStack>

                <Textarea
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  placeholder="꿈 내용을 자세히 적어주세요..."
                  size="lg"
                  rows={10}
                />

                <Button
                  colorScheme="purple"
                  size="lg"
                  width="100%"
                  onClick={analyzeDream}
                >
                  꿈 분석하기
                </Button>
              </VStack>
            </Box>

            {analysis && (
              <Box
                w="100%"
                bg={cardBgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={4}>분석 결과</Heading>
                <Text>{analysis}</Text>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default DreamAnalysis;