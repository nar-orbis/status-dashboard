// pages/status.tsx
import {
    Box,
    Badge,
    Flex,
    Heading,
    Stack,
    Text,
  } from "@chakra-ui/react"
  
  type ServiceStatus = {
    name: string
    status: "online" | "degraded" | "offline"
    history: ("online" | "offline" | "degraded")[]
  }
  
  const mockStatuses: ServiceStatus[] = [
    {
      name: "API Gateway",
      status: "online",
      history: ["online", "online", "online", "offline", "online"]
    },
    {
      name: "Database",
      status: "degraded",
      history: ["online", "degraded", "online", "degraded", "degraded"]
    },
    {
      name: "Auth Service",
      status: "offline",
      history: ["offline", "offline", "online", "online", "online"]
    }
  ]
  
  const statusColor = {
    online: "green",
    degraded: "yellow",
    offline: "red"
  }
  
  const StatusBadge = ({ status }: { status: ServiceStatus["status"] }) => (
    <Badge colorScheme={statusColor[status]}>{status}</Badge>
  )
  
  const StatusHistoryBar = ({ history }: { history: ServiceStatus["history"] }) => (
    <Flex gap={1}>
      {history.map((s, i) => (
        <Box
          key={i}
          boxSize={3}
          borderRadius="full"
          bg={`${statusColor[s]}.500`}
        />
      ))}
    </Flex>
  )
  
  export default function StatusPage() {
  
    return (
      <Flex minH="100vh" align="center" justify="center" p={4}>
        <Stack w="full" maxW="2xl">
          <Heading size="lg" textAlign="center">Service Status</Heading>
          {mockStatuses.map((svc) => (
            <Box key={svc.name} p={4} borderWidth={1} borderRadius="lg" bg="white" shadow="sm">
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="semibold">{svc.name}</Text>
                  <StatusHistoryBar history={svc.history} />
                </Box>
                <StatusBadge status={svc.status} />
              </Flex>
            </Box>
          ))}
        </Stack>
      </Flex>
    )
  }
  