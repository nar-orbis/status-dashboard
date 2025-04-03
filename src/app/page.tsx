"use client"

import {
  Box,
  Badge,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Tooltip,
  SimpleGrid,
  Select,
  HStack
} from "@chakra-ui/react"
import { useState } from "react"

type Status = "online" | "degraded" | "offline"
type Resolution = "15min" | "1hr"

type HistoryPoint = {
  timestamp: string
  status: Status
}

type ServiceStatus = {
  name: string
  status: Status
  history: HistoryPoint[]
}

const SERVICE_NAMES = ["Discovery", "Catalyst", "Landscape"]

const INTERVALS = {
  "15min": 15 * 60 * 1000,
  "1hr": 60 * 60 * 1000
}

const COLORS = {
  online: "green.400",
  degraded: "yellow.400",
  offline: "red.400"
}

// Generate simulated history points
const generateHistory = (interval: number, hours: number): HistoryPoint[] => {
  const now = Date.now()
  const points = []
  const total = (hours * 60 * 60 * 1000) / interval
  for (let i = 0; i < total; i++) {
    const timestamp = new Date(now - i * interval).toISOString()
    const r = Math.random()
    const status: Status = r < 0.92 ? "online" : r < 0.97 ? "degraded" : "offline"
    points.unshift({ timestamp, status })
  }
  return points
}

const computeUptime = (history: HistoryPoint[], hours: number): number => {
  const since = Date.now() - hours * 60 * 60 * 1000
  const filtered = history.filter(h => new Date(h.timestamp).getTime() >= since)
  const onlineCount = filtered.filter(h => h.status === "online").length
  return Math.round((onlineCount / filtered.length) * 100)
}

const getUptimeColor = (pct: number) => {
  if (pct >= 99.9) return "green.500"
  if (pct >= 98) return "yellow.500"
  return "red.500"
}

const StatusBadge = ({ status }: { status: Status }) => (
  <Badge colorScheme={status}>{status}</Badge>
)

const StatusGrid = ({
  history,
  resolution
}: {
  history: HistoryPoint[]
  resolution: Resolution
}) => {
  const cellSize = 12 // px, adjust as needed
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(auto-fill, minmax(${cellSize}px, 1fr))`}
      gap="2px"
      maxW="100%"
    >
      {history.map((entry, i) => (
        <Tooltip
          key={i}
          label={`${new Date(entry.timestamp).toLocaleString()} — ${entry.status}`}
          hasArrow
          openDelay={300}
        >
          <Box
            w={`${cellSize}px`}
            h={`${cellSize}px`}
            bg={COLORS[entry.status]}
            borderRadius="sm"
            cursor="pointer"
          />
        </Tooltip>
      ))}
    </Box>
  )
}


const ServiceBlock = ({ name }: { name: string }) => {
  const [resolution, setResolution] = useState<Resolution>("15min")

  const interval = INTERVALS[resolution]
  const history = generateHistory(interval, 72)

  const uptime24 = computeUptime(history, 24)
  const uptime7d = computeUptime(history, 24 * 7)
  const uptime30d = computeUptime(history, 24 * 30)

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" bg="white" shadow="sm">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="semibold">{name}</Text>
        <Select
          size="sm"
          value={resolution}
          onChange={(e) => setResolution(e.target.value as Resolution)}
          width="auto"
        >
          <option value="15min">15 min</option>
          <option value="1hr">1 hour</option>
        </Select>
      </Flex>
      <StatusGrid history={history} resolution={resolution} />
      <HStack mt={3} spacing={4}>
        <Text fontSize="sm">
          24h:{" "}
          <Box as="span" color={getUptimeColor(uptime24)} fontWeight="bold">
            {uptime24}%
          </Box>
        </Text>
        <Text fontSize="sm">
          7d:{" "}
          <Box as="span" color={getUptimeColor(uptime7d)} fontWeight="bold">
            {uptime7d}%
          </Box>
        </Text>
        <Text fontSize="sm">
          30d:{" "}
          <Box as="span" color={getUptimeColor(uptime30d)} fontWeight="bold">
            {uptime30d}%
          </Box>
        </Text>
      </HStack>
    </Box>
  )
}

export default function StatusPage() {
  const bg = useColorModeValue("gray.50", "gray.800")

  return (
    <Flex minH="100vh" bg={bg} align="center" justify="center" p={4}>
      <Stack spacing={6} w="full" maxW="6xl">
        <Heading size="lg" textAlign="center">
          Service Status
        </Heading>
        {SERVICE_NAMES.map((name) => (
          <ServiceBlock key={name} name={name} />
        ))}
      </Stack>
    </Flex>
  )
}
