import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  Grid,
  useToast,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';
import Head from 'next/head';
import Webcam from 'react-webcam';

const FortuneTelling = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [availableExperts, setAvailableExperts] = useState([
    { id: 1, name: '김도사', specialty: '사주명리학', experience: '15년' },
    { id: 2, name: '이선생', specialty: '타로점', experience: '10년' },
    { id: 3, name: '박대가', specialty: '사주팔자', experience: '20년' },
  ]);
  
  const webcamRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  const [userInfo, setUserInfo] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startConsultation = async () => {
    // 사용자 정보 유효성 검사
    if (!userInfo.name || !userInfo.birthDate) {
      toast({
        title: '필수 정보를 입력해주세요.',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    try {
      // 여기에 화상 상담 연결 로직 추가 예정
      setIsConnected(true);
      toast({
        title: '상담사와 연결되었습니다.',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: '연결에 실패했습니다.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const ExpertCard = ({ expert }) => (
    <Box
      bg={cardBgColor}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      cursor="pointer"
      onClick={onOpen}
      _hover={{ transform: 'scale(1.02)', transition: '0.2s' }}
    >
      <VStack spacing={3} align="start">
        <Heading size="md">{expert.name}</Heading>
        <Text>전문 분야: {expert.specialty}</Text>
        <Text>경력: {expert.experience}</Text>
      </VStack>
    </Box>
  );

  return (
    <>
      <Head>
        <title>실시간 사주풀이 상담 - 꿈해몽 & 사주풀이 플랫폼</title>
        <meta name="description" content="전문 사주풀이사와의 실시간 화상 상담 서비스" />
      </Head>

      <Box bg={bgColor} minH="100vh" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading>실시간 사주풀이 상담</Heading>

            {!isConnected ? (
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                gap={6}
                w="100%"
              >
                {availableExperts.map(expert => (
                  <ExpertCard key={expert.id} expert={expert} />
                ))}
              </Grid>
            ) : (
              <Box
                w="100%"
                bg={cardBgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <VStack spacing={4}>
                  <HStack w="100%" spacing={4}>
                    <Box flex={1}>
                      <Webcam
                        ref={webcamRef}
                        mirrored
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    </Box>
                    <Box flex={1} bg="gray.700" h="400px" borderRadius="8px">
                      {/* 상담사 비디오 영역 */}
                    </Box>
                  </HStack>
                  <Button colorScheme="red" onClick={() => setIsConnected(false)}>
                    상담 종료
                  </Button>
                </VStack>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상담 신청</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>이름</FormLabel>
                <Input
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력하세요"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>생년월일</FormLabel>
                <Input
                  name="birthDate"
                  type="date"
                  value={userInfo.birthDate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>태어난 시간</FormLabel>
                <Input
                  name="birthTime"
                  type="time"
                  value={userInfo.birthTime}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>성별</FormLabel>
                <Select
                  name="gender"
                  value={userInfo.gender}
                  onChange={handleInputChange}
                  placeholder="성별을 선택하세요"
                >
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </Select>
              </FormControl>

              <Button
                colorScheme="blue"
                width="100%"
                mt={4}
                onClick={() => {
                  onClose();
                  startConsultation();
                }}
              >
                상담 시작하기
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FortuneTelling;