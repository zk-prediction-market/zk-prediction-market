"use client"

import { Box, Button, Divider, Heading, HStack, Input, Link, Text, useBoolean, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import Chart from "@/components/Chart"

export default function DetailsPage() {
    const router = useRouter()

    return (
        <>
            <Box width="100%" mb="10">
                <HStack width="100%" justify="space-between">
                    <Box width="65%">
                        <Chart />
                    </Box>
                    <Box width="30%">
                        <Heading as="h2" size="xl">
                            Summary
                        </Heading>

                        <Text pt="2" fontSize="md"></Text>

                        <Divider pt="5" borderColor="gray.500" />

                        <Text pt="2" fontSize="md"></Text>

                        <Text pt="2" fontSize="md">
                            Vice President Kamala Harris has gained significant momentum in the 2024 presidential
                            election, narrowing the gap with former President Donald Trump. Following President Joe
                            Biden's withdrawal and endorsement of Harris, she secured a majority of Democratic delegates
                            and raised a record $100 million in 24 hours. Harris's campaign has seen her odds of winning
                            rise to 38% on Polymarket, up from 1% a month earlier. Her strong ties to Silicon Valley and
                            potential policies on technology, clean energy, and cannabis legalization have garnered
                            substantial support, particularly from tech executives and investors.
                        </Text>
                    </Box>
                </HStack>
            </Box>
        </>
    )
}
