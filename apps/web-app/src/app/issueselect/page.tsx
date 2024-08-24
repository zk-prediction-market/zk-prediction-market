// app/(custom-layout)/dao-directory/page.tsx
"use client"

import { Box, Container, Flex, Input, SimpleGrid, Text, Heading, Icon, Button } from "@chakra-ui/react"
import { FiCircle, FiHome, FiDribbble } from "react-icons/fi"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts"

const daoList = [
    { name: "アメリカ大統領選", icon: FiCircle, value: 65 },
    { name: "自民党総裁戦", icon: FiHome, value: 78 },
    { name: "自民党総裁戦自民党員票", icon: FiCircle, value: 42 },
    { name: "DAO XのProposal A or B", icon: FiDribbble, value: 55 },
    { name: "DAO XのProposal B or C", icon: FiDribbble, value: 30 },
    { name: "DAO XのProposal C or D", icon: FiDribbble, value: 89 }
]

const PercentageBarChart = ({ value }) => {
    const data = [{ name: "Percentage", value }]

    return (
        <ResponsiveContainer width="100%" height={60}>
            <BarChart data={data} layout="vertical">
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" hide />
                <Tooltip
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ backgroundColor: "#2D3748", border: "none" }}
                    labelStyle={{ color: "#A0AEC0" }}
                />
                <Bar dataKey="value" fill="#38B2AC" background={{ fill: "#2D3748" }}>
                    <LabelList dataKey="value" position="center" fill="#FFFFFF" formatter={(value) => `${value}%`} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

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

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
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
                                borderColor: "blue.700",
                                boxShadow: "0 0 15px rgba(66, 153, 225, 0.6)"
                            }}
                        >
                            <Flex direction="column" justify="space-between" height="100%">
                                <Flex align="center" mb={6} position="relative">
                                    <Icon as={dao.icon} w={12} h={12} mr={4} position="absolute" left={0} />
                                    <Heading size="md" flex={1} width="100%" textAlign="center" pl={12} pr={12}>
                                        {dao.name}
                                    </Heading>
                                    <Button colorScheme="teal.300" size="md" width="40%" alignSelf="center">
                                        Trade
                                    </Button>
                                </Flex>
                                <Box mb={4}>
                                    <PercentageBarChart value={dao.value} />
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}
