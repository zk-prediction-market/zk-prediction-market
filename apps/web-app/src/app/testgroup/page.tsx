"use client"

import { Box, Button, Divider, Heading, HStack, Link, Text } from "@chakra-ui/react"
import { Identity } from "@semaphore-protocol/core"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import Stepper from "../../components/Stepper"
import { useLogContext } from "../../context/LogContext"
import Chart from "@/components/Chart"
import { Profile } from "@/components/profile"
import {Groupdash} from "@/components/groupdash"

export default function DashboardPage() {
  return (
    <div>
        <Groupdash />
    </div>
  )
}