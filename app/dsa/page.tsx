"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Sample data for testing
const sampleJobs = [
  { company: "Google", role: "SDE Intern", appliedDate: "2025-04-01", status: "Applied" },
  { company: "Microsoft", role: "Software Engineer", appliedDate: "2025-03-15", status: "Interview" },
  { company: "Amazon", role: "Frontend Developer", appliedDate: "2025-04-10", status: "Applied" },
  { company: "Meta", role: "React Developer", appliedDate: "2025-02-20", status: "Rejected" },
  { company: "Apple", role: "iOS Developer", appliedDate: "2025-03-05", status: "Offer" },
  { company: "Netflix", role: "Full Stack Engineer", appliedDate: "2025-03-25", status: "Interview" },
  { company: "Google", role: "Product Manager", appliedDate: "2025-04-05", status: "Applied" },
  { company: "Microsoft", role: "SDE Intern", appliedDate: "2025-03-10", status: "Rejected" },
  { company: "google", role: "sde intern", appliedDate: "2025-02-15", status: "Applied" },
]

// Problem 1: Sort jobs by appliedDate (latest first)
function sortJobsByDate(jobs: any[]) {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.appliedDate).getTime()
    const dateB = new Date(b.appliedDate).getTime()
    return dateB - dateA // Latest first
  })
}

// Problem 2: Status Frequency Counter
function countStatusFrequency(jobs: any[]) {
  const statusCount: Record<string, number> = {}

  for (const job of jobs) {
    const status = job.status
    statusCount[status] = (statusCount[status] || 0) + 1
  }

  return statusCount
}

// Problem 3: Detect Duplicate Applications
function findDuplicateApplications(jobs: any[]) {
  const seen = new Map()
  const duplicates = []

  for (const job of jobs) {
    // Create a unique key by combining company and role (case insensitive)
    const key = `${job.company.toLowerCase()}-${job.role.toLowerCase()}`

    if (seen.has(key)) {
      duplicates.push({
        original: seen.get(key),
        duplicate: job,
      })
    } else {
      seen.set(key, job)
    }
  }

  return duplicates
}

export default function DSAPage() {
  const [activeTab, setActiveTab] = useState("problem1")
  const [result, setResult] = useState<any>(null)

  const runProblem1 = () => {
    const sorted = sortJobsByDate(sampleJobs)
    setResult(sorted)
  }

  const runProblem2 = () => {
    const frequency = countStatusFrequency(sampleJobs)
    setResult(frequency)
  }

  const runProblem3 = () => {
    const duplicates = findDuplicateApplications(sampleJobs)
    setResult(duplicates)
  }

  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-6">DSA Problems</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="problem1">Problem 1</TabsTrigger>
          <TabsTrigger value="problem2">Problem 2</TabsTrigger>
          <TabsTrigger value="problem3">Problem 3</TabsTrigger>
        </TabsList>

        <TabsContent value="problem1">
          <Card>
            <CardHeader>
              <CardTitle>Problem 1: Job Tracker Sorting</CardTitle>
              <CardDescription>Sort jobs by appliedDate (latest first).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                  <pre className="text-sm">{JSON.stringify(sampleJobs, null, 2)}</pre>
                </div>

                <Button onClick={runProblem1}>Run Solution</Button>

                {result && activeTab === "problem1" && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Result:</h3>
                    <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                      <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Solution Code:</h3>
                  <div className="bg-muted p-4 rounded-md overflow-auto">
                    <pre className="text-sm">{`function sortJobsByDate(jobs) {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.appliedDate).getTime();
    const dateB = new Date(b.appliedDate).getTime();
    return dateB - dateA; // Latest first
  });
}`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problem2">
          <Card>
            <CardHeader>
              <CardTitle>Problem 2: Status Frequency Counter</CardTitle>
              <CardDescription>Count the frequency of each status in the job applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                  <pre className="text-sm">{JSON.stringify(sampleJobs, null, 2)}</pre>
                </div>

                <Button onClick={runProblem2}>Run Solution</Button>

                {result && activeTab === "problem2" && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Result:</h3>
                    <div className="bg-muted p-4 rounded-md overflow-auto">
                      <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Solution Code:</h3>
                  <div className="bg-muted p-4 rounded-md overflow-auto">
                    <pre className="text-sm">{`function countStatusFrequency(jobs) {
  const statusCount = {};
  
  for (const job of jobs) {
    const status = job.status;
    statusCount[status] = (statusCount[status] || 0) + 1;
  }
  
  return statusCount;
}`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problem3">
          <Card>
            <CardHeader>
              <CardTitle>Problem 3: Detect Duplicate Applications</CardTitle>
              <CardDescription>Find duplicate applications based on company + role (case insensitive).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                  <pre className="text-sm">{JSON.stringify(sampleJobs, null, 2)}</pre>
                </div>

                <Button onClick={runProblem3}>Run Solution</Button>

                {result && activeTab === "problem3" && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Result:</h3>
                    <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                      <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Solution Code:</h3>
                  <div className="bg-muted p-4 rounded-md overflow-auto">
                    <pre className="text-sm">{`function findDuplicateApplications(jobs) {
  const seen = new Map();
  const duplicates = [];
  
  for (const job of jobs) {
    // Create a unique key by combining company and role (case insensitive)
    const key = \`\${job.company.toLowerCase()}-\${job.role.toLowerCase()}\`;
    
    if (seen.has(key)) {
      duplicates.push({
        original: seen.get(key),
        duplicate: job
      });
    } else {
      seen.set(key, job);
    }
  }
  
  return duplicates;
}`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
