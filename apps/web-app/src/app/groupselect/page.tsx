// app/(custom-layout)/dao-directory/page.tsx
"use client"

import { Box, Container, Flex, Input, SimpleGrid, Text, Button, VStack, Heading, Icon } from "@chakra-ui/react"
// import { SearchIcon, SettingsIcon } from "@chakra-ui/icons"
import { FiCircle, FiHome, FiDribbble } from "react-icons/fi"

const daoList = [
    { name: "Liberal Democratic Party", icon: FiCircle },
    { name: "Japanese citizens", icon: FiHome },
    { name: "USA citizens", icon: FiCircle },
    { name: "Ethereum Japan", icon: FiDribbble }
]

export default function DAODirectory() {
    return (
        <Box minH="100vh" minW={"90vw"}>
            {/* <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="gray.800">
        <Flex align="center" mr={5}>
          <Icon as={FiCircle} w={6} h={6} mr={2} />
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            zk Prediction Market
          </Heading>
        </Flex>

        <Flex align="center">
          <Button variant="ghost" mr={3}>Home</Button>
          <Button variant="ghost" color="red.500" mr={3}>Create a Futarchy</Button>
          <Icon as={SettingsIcon} w={6} h={6} mr={3} />
          <Button colorScheme="blue">Connect Wallet</Button>
        </Flex>
      </Flex> */}

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
                                <Button colorScheme="teal.300" size="md" width="40%" alignSelf="center">
                                    JOIN
                                </Button>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}
