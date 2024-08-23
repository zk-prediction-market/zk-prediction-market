"use client"

import { Box, Text } from "@chakra-ui/react"

const dummyData = [
    0.123, 0.456, 0.789, 0.234, 0.567, 0.89, 0.345, 0.678, 0.901, 0.012, 0.345, 0.678, 0.901, 0.234, 0.567, 0.89, 0.123,
    0.456, 0.789, 0.012, 0.345, 0.678, 0.901, 0.234, 0.567, 0.89, 0.123, 0.456, 0.789, 0.012
]

export default function Chart() {
    return (
        <>
            <Box>
                <Text>Chart</Text>
                {dummyData}
            </Box>
        </>
    )
}
