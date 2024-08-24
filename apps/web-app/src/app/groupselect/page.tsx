"use client"

import {
    Box,
    Container,
    Flex,
    Input,
    SimpleGrid,
    Text,
    Button,
    VStack,
    Heading,
    Icon,
    useToast
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FiCircle, FiHome, FiDribbble } from "react-icons/fi"
import ENSCheckButton from "@/components/ENSCheckButton"

const daoList = [
    { name: "Liberal Democratic Party", icon: FiCircle },
    { name: "Japanese citizens", icon: FiHome },
    { name: "USA citizens", icon: FiCircle },
    { name: "ENS holders", icon: FiDribbble, requiresENS: true }
]

export default function DAODirectory() {
    const router = useRouter()
    const toast = useToast()

    const handleJoin = (dao) => {
        if (dao.requiresENS) {
            // ENSが必要なDAOの場合は何もしない（ENSCheckButtonが処理を行う）
            return
        }
        // その他のDAOの場合は直接遷移
        router.push("/group")
    }

    return (
        <Box minH="100vh" minW={"90vw"}>
            <Container maxW="container.xl" py={8}>
                <Input placeholder="Search" size="lg" bg="gray.800" mb={8} borderRadius="md" />

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    {daoList.map((dao) => (
                        <Box
                            key={dao.name}
                            bg="gray.800"
                            p={6}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="gray"
                            transition="all 0.3s"
                            _hover={{
                                borderColor: "blue.500",
                                boxShadow: "0 0 15px rgba(66, 153, 225, 0.6)"
                            }}
                        >
                            <VStack align="stretch" spacing={5} justifyContent="center">
                                <Heading size="md" textAlign="left">
                                    {dao.name}
                                </Heading>
                                <Icon as={dao.icon} w={16} h={16} alignSelf="center" />
                                {dao.requiresENS ? (
                                    <ENSCheckButton onJoin={() => router.push("/group")} />
                                ) : (
                                    <Button
                                        colorScheme="teal"
                                        size="md"
                                        width="40%"
                                        alignSelf="center"
                                        onClick={() => handleJoin(dao)}
                                    >
                                        JOIN
                                    </Button>
                                )}
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}
